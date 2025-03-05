
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Square, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface VoiceRecorderProps {
  onTranscriptionComplete: (text: string) => void;
  className?: string;
}

const VoiceRecorder: React.FC<VoiceRecorderProps> = ({
  onTranscriptionComplete,
  className,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        setIsProcessing(true);
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        
        try {
          // Convert to base64
          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            const base64Audio = reader.result?.toString().split(",")[1];
            
            if (base64Audio) {
              // Send to server for transcription
              try {
                const response = await fetch("/api/transcribe", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ audio: base64Audio }),
                });
                
                const data = await response.json();
                
                if (data.text) {
                  onTranscriptionComplete(data.text);
                } else {
                  toast.error("Failed to transcribe audio");
                }
              } catch (error) {
                console.error("Error sending audio for transcription:", error);
                toast.error("Error processing voice recording");
              }
            }
            
            setIsProcessing(false);
            // Stop all tracks
            stream.getTracks().forEach(track => track.stop());
          };
        } catch (error) {
          console.error("Error processing audio:", error);
          setIsProcessing(false);
          toast.error("Error processing voice recording");
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast.info("Recording started. Speak now...");
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast.error("Could not access microphone. Please check permissions.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      toast.info("Processing your recording...");
    }
  };

  return (
    <div className={className}>
      {!isRecording ? (
        <Button
          onClick={startRecording}
          disabled={isProcessing}
          className="rounded-full w-14 h-14 shadow-lg hover:scale-105 transition-transform"
          aria-label="Start recording"
        >
          {isProcessing ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <Mic className="h-6 w-6" />
          )}
        </Button>
      ) : (
        <Button
          onClick={stopRecording}
          variant="destructive"
          className="rounded-full w-14 h-14 shadow-lg hover:scale-105 transition-transform"
          aria-label="Stop recording"
        >
          <Square className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
};

export default VoiceRecorder;
