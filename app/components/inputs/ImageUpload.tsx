import { CldUploadWidget, CldUploadWidgetProps } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import toast from 'react-hot-toast'; 

declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, no-var
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string, status?: 'pending' | 'approved' | 'rejected') => void;
  value: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, value }) => {
  type CloudinaryModeration = {
    kind: string;
    status: 'approved' | 'rejected' | 'pending';
  };
  
  type CloudinaryUploadInfo = {
    secure_url?: string;
    moderation?: CloudinaryModeration[];
    [key: string]: unknown;
  };
  
     const handleUpload = useCallback(
      (result: Parameters<NonNullable<CldUploadWidgetProps["onSuccess"]>>[0]) => {
        if (result.info && typeof result.info !== "string") {
          const info = result.info as CloudinaryUploadInfo;
  
          const moderationArray = info.moderation; 
          const moderationStatus = moderationArray && moderationArray.length > 0
            ? moderationArray[0].status as 'approved' | 'rejected' | 'pending'
            : 'approved';

        const secureUrl = ("secure_url" in info) ? info.secure_url : "";

        if (moderationStatus === 'rejected') {
          toast.error("A imagem foi bloqueada pela moderação de conteúdo impróprio.");
          onChange("", "rejected");
          return;
        } else if (moderationStatus === 'pending') {
          toast("A imagem está sob revisão e não pode ser publicada ainda.");
          onChange("", "pending"); 
          return;
        } else if (secureUrl) {
          onChange(secureUrl, moderationStatus); 
        } else {
          toast.error("Erro no upload da imagem. Por favor, tente novamente.");
          onChange("", undefined);
        }
      } else {
        toast.error("Erro inesperado no upload da imagem.");
        onChange("", undefined);
      }
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset="cloudName"
      options={{ 
        maxFiles: 1,
        moderation: "aws_rek" 

      }}
    >
      {(widget) => {
        const open = widget?.open;
        return (
          <div
            onClick={() => open?.()}
            className="
          relative
          cursor-pointer
          hover:opacity-70
          transition
          border-dashed
          border-2
          p-20
          border-neutral-300
          flex
          flex-col
          justify-center
          items-center
          gap-4
          text-neutral-600
        "
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg">
              Clique para adicionar uma imagem
            </div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Upload"
                  fill
                  style={{ objectFit: "cover" }}
                  src={value}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
