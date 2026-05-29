import React, { useState, useRef } from 'react';
import { X, Mic, Square, Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSupabase } from '../../context/SupabaseContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import './AddTransactionModal.css';

const AddTransactionModal = ({ isOpen, onClose, onSuccess }) => {
  const { t } = useTranslation();
  const { supabase, user } = useSupabase();
  
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [isCredit, setIsCredit] = useState(false); // default expense
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBase64, setAudioBase64] = useState(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          setAudioBase64(reader.result);
        };
        // Clean up tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      setAudioBase64(null);

      // 15 sec max
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= 14) {
            stopRecording();
            return 15;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (err) {
      console.error("Microphone access denied or error:", err);
      setError(t("Microphone access is required to record voice notes."));
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !amount) {
      setError(t("Please fill in all required fields."));
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      const { error: insertError } = await supabase
        .from('transactions')
        .insert([{
          user_id: user?.id || null,
          title,
          amount: parseFloat(amount),
          is_credit: isCredit,
          type: isCredit ? 'income' : 'expense',
          date: new Date().toISOString(),
          audio_data: audioBase64 || null
        }]);

      if (insertError) throw insertError;
      
      onSuccess();
      handleClose();
    } catch (err) {
      console.error(err);
      setError(t("Failed to save transaction: ") + (err.message || err.details || JSON.stringify(err)));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setTitle('');
    setAmount('');
    setIsCredit(false);
    setAudioBase64(null);
    setError('');
    setIsRecording(false);
    clearInterval(timerRef.current);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{t("Add Transaction")}</h2>
          <button className="close-btn" onClick={handleClose}>
            <X size={20} />
          </button>
        </div>

        {error && <div className="text-danger text-sm mb-4 bg-danger-subtle p-2 rounded">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="type-selector">
            <button 
              type="button" 
              className={`type-btn ${isCredit ? 'active income' : ''}`}
              onClick={() => setIsCredit(true)}
            >
              {t("Income")}
            </button>
            <button 
              type="button" 
              className={`type-btn ${!isCredit ? 'active expense' : ''}`}
              onClick={() => setIsCredit(false)}
            >
              {t("Expense")}
            </button>
          </div>

          <div className="form-group">
            <label className="form-label">{t("Amount (₹)")}</label>
            <Input 
              type="number" 
              placeholder="0.00" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t("Title / Description")}</label>
            <Input 
              type="text" 
              placeholder={t("e.g., Sold crops, Bought seeds")} 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required
            />
          </div>

          <div className="voice-record-section">
            <p className="form-label mb-4 text-center">{t("Or add a voice note (max 15s)")}</p>
            <button 
              type="button" 
              className={`record-btn ${isRecording ? 'recording' : ''}`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? <Square size={24} fill="currentColor" /> : <Mic size={28} />}
            </button>
            
            <div className="recording-status">
              {isRecording ? (
                <span className="text-danger font-bold">{t("Recording...")} 0:{recordingTime.toString().padStart(2, '0')} / 0:15</span>
              ) : audioBase64 ? (
                <div className="flex flex-col items-center gap-2">
                  <span className="text-success font-medium">✓ {t("Voice note saved")}</span>
                  <button 
                    type="button" 
                    className="text-xs text-danger underline hover:text-red-700" 
                    onClick={() => setAudioBase64(null)}
                  >
                    {t("Discard recording")}
                  </button>
                </div>
              ) : (
                <span>{t("Tap to record (Optional)")}</span>
              )}
            </div>
            
            {audioBase64 && !isRecording && (
              <audio src={audioBase64} controls className="mt-4 w-full h-8" />
            )}
          </div>

          <div className="modal-actions">
            <Button type="button" variant="ghost" onClick={handleClose}>
              {t("Cancel")}
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : t("Save")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionModal;
