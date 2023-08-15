'use client';

import { FC, useEffect, useState } from 'react';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (drc: string) => void;
  disabled?: boolean;
}
const ImageUpload: FC<ImageUploadProps> = ({ onChange, value, disabled }) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);
  if (!isMounted) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-4">
      <CldUploadButton
        options={{
          maxFiles: 1,
        }}
        uploadPreset="cyixhzyh"
        onUpload={(result: any) => onChange(result.info.secure_url)}
      >
        <div className="flex flex-col items-center justify-center p-4 space-y-2 transition border-4 border-dashed rounded-lg border-primary/10">
          <div className="relative w-40 h-40">
            <Image
              fill
              alt="Companion Image"
              src={value || '/placeholder.svg'}
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};

export { ImageUpload };
