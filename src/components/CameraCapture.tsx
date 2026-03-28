import { useState, useRef, useCallback, useEffect } from 'react';
import { Camera, X, RotateCcw, Check, MapPin, SwitchCamera, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GpsCoords {
  lat: number;
  lng: number;
  accuracy: number;
  timestamp: string;
  locationLabel: string;
}

interface CameraCaptureProps {
  onCapture: (imageDataUrl: string, gpsCoords: GpsCoords) => void;
  onClose: () => void;
}

export default function CameraCapture({ onCapture, onClose }: CameraCaptureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [gps, setGps] = useState<GpsCoords | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [cameraError, setCameraError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Get GPS
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGps({
            lat: Math.round(pos.coords.latitude * 10000) / 10000,
            lng: Math.round(pos.coords.longitude * 10000) / 10000,
            accuracy: Math.round(pos.coords.accuracy),
            timestamp: new Date().toISOString(),
            locationLabel: `${pos.coords.latitude.toFixed(2)}°N, ${pos.coords.longitude.toFixed(2)}°E`,
          });
        },
        () => {
          setGps({ lat: 12.9716, lng: 77.5946, accuracy: 50, timestamp: new Date().toISOString(), locationLabel: 'Bengaluru, Karnataka' });
        }
      );
    }
  }, []);

  const startCamera = useCallback(async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode }, audio: false });
      setStream(s);
      if (videoRef.current) {
        videoRef.current.srcObject = s;
      }
      setCameraError(false);
    } catch {
      setCameraError(true);
    }
  }, [facingMode]);

  useEffect(() => {
    if (!capturedImage) startCamera();
    return () => { stream?.getTracks().forEach(t => t.stop()); };
  }, [facingMode]);

  const capture = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d')?.drawImage(video, 0, 0);
    setCapturedImage(canvas.toDataURL('image/jpeg', 0.85));
    stream?.getTracks().forEach(t => t.stop());
  };

  const retake = () => {
    setCapturedImage(null);
    startCamera();
  };

  const usePhoto = () => {
    if (capturedImage && gps) onCapture(capturedImage, gps);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setCapturedImage(reader.result as string);
      stream?.getTracks().forEach(t => t.stop());
    };
    reader.readAsDataURL(file);
  };

  const toggleCamera = () => {
    stream?.getTracks().forEach(t => t.stop());
    setFacingMode(f => (f === 'user' ? 'environment' : 'user'));
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4">
        <Button variant="ghost" size="icon" className="text-white h-10 w-10 bg-black/40 rounded-full" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
        {gps && (
          <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs">
            <MapPin className="w-3 h-3 text-accent" />
            <span>{gps.locationLabel}</span>
          </div>
        )}
        {!capturedImage && !cameraError && (
          <Button variant="ghost" size="icon" className="text-white h-10 w-10 bg-black/40 rounded-full" onClick={toggleCamera}>
            <SwitchCamera className="w-5 h-5" />
          </Button>
        )}
      </div>

      {/* Viewfinder or preview */}
      <div className="flex-1 flex items-center justify-center">
        {cameraError ? (
          <div className="text-center text-white px-8 space-y-4">
            <Camera className="w-16 h-16 mx-auto opacity-40" />
            <p className="text-sm">Camera access denied. Please upload a photo from your gallery instead.</p>
            <Button className="bg-accent text-accent-foreground" onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-4 h-4 mr-2" /> Upload Photo
            </Button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
          </div>
        ) : capturedImage ? (
          <div className="relative w-full h-full">
            <img src={capturedImage} alt="Captured" className="w-full h-full object-contain" />
            {gps && (
              <div className="absolute bottom-4 left-4 bg-black/70 text-white text-xs px-3 py-2 rounded-lg">
                📍 Lat: {gps.lat}, Lng: {gps.lng}
              </div>
            )}
          </div>
        ) : (
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
        )}
      </div>

      {/* Bottom controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {capturedImage ? (
          <div className="flex items-center justify-center gap-6">
            <Button variant="outline" className="h-12 px-6 rounded-full border-white/30 text-white bg-white/10" onClick={retake}>
              <RotateCcw className="w-4 h-4 mr-2" /> Retake
            </Button>
            <Button className="h-12 px-8 rounded-full bg-accent text-accent-foreground" onClick={usePhoto}>
              <Check className="w-4 h-4 mr-2" /> Use Photo
            </Button>
          </div>
        ) : !cameraError ? (
          <div className="flex items-center justify-center">
            <button onClick={capture} className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-full bg-white" />
            </button>
          </div>
        ) : null}
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
