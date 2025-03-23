import React from 'react';
import { motion } from 'framer-motion';
import { Upload, FileCheck, Shield } from 'lucide-react';

const PassportIssuance = () => {
  const [step, setStep] = React.useState(1);
  const [uploading, setUploading] = React.useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      setStep(2);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <h1 className="text-4xl font-bold text-gradient">Digital Passport Issuance</h1>
        <p className="text-foreground/80">
          Secure your digital identity with blockchain-based verification. Upload your documents and complete the verification process.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card rounded-xl p-8"
      >
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`flex items-center ${i !== 3 ? 'flex-1' : ''}`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step >= i ? 'bg-primary text-background' : 'bg-accent text-foreground/60'
                }`}
              >
                {i}
              </div>
              {i !== 3 && (
                <div
                  className={`h-1 flex-1 mx-2 ${
                    step > i ? 'bg-primary' : 'bg-accent'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div className="glass-card rounded-lg p-8 text-center">
              <input
                type="file"
                id="document-upload"
                className="hidden"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="document-upload"
                className="cursor-pointer block space-y-4"
              >
                <Upload className="w-12 h-12 text-primary mx-auto" />
                <div>
                  <p className="font-medium">Upload Verification Documents</p>
                  <p className="text-sm text-foreground/60">
                    Drag and drop or click to upload your identification documents
                  </p>
                </div>
              </label>
            </div>

            {uploading && (
              <div className="h-2 bg-accent rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/2 animate-pulse" />
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-card rounded-lg p-6 space-y-4">
                <FileCheck className="w-8 h-8 text-primary" />
                <h3 className="font-medium">Documents Verified</h3>
                <p className="text-sm text-foreground/60">
                  Your documents have been successfully uploaded and verified
                </p>
              </div>
              <div className="glass-card rounded-lg p-6 space-y-4">
                <Shield className="w-8 h-8 text-primary" />
                <h3 className="font-medium">Identity Confirmed</h3>
                <p className="text-sm text-foreground/60">
                  Your identity has been confirmed and is ready for blockchain registration
                </p>
              </div>
            </div>
            <button
              onClick={() => setStep(3)}
              className="glass-button w-full"
            >
              Continue to Final Step
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-medium">Ready for Blockchain Registration</h3>
              <p className="text-foreground/60 mt-2">
                Your digital identity is ready to be registered on the blockchain
              </p>
            </div>
            <button className="glass-button">
              Register Digital Identity
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default PassportIssuance;