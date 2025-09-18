import { IconUpload, IconX } from '@tabler/icons-react';
import axios from 'axios';
import classNames from 'classnames';
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { toast } from 'react-toastify';
import Label from './Label';

export interface ImageUploadProps {
  label?: string;
  id?: string;
  containerClassName?: string;
  requiredLabel?: boolean;
  name?: string;
  multiple?: boolean;
  setUploadedImageUrl?: Dispatch<SetStateAction<string>>;
}

const ImageUpload = ({
  label,
  id,
  containerClassName,
  requiredLabel,
  name,
  multiple,
  setUploadedImageUrl,
}: ImageUploadProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0] ?? null;
    setImageFile?.(selectedFile);

    try {
      setUploading(true);
      setUploadProgress(0);
      const formData = new FormData();
      selectedFile && formData.append('image', selectedFile);
      const response = await axios.post(
        'http://localhost:5000/api/upload/file',
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (ProgressEvent) => {
            const total = ProgressEvent.total;
            const progressCompleted = total
              ? Math.round((ProgressEvent.loaded * 100) / total)
              : 0;
            setUploadProgress(progressCompleted);
          },
        }
      );
      if (response.data.success) {
        setUploadedImageUrl?.(response.data.data.path);
      } else {
        throw new Error('Failed to fetch product');
      }
    } catch (error: any) {
      return error.message || 'Failed to fetch product';
    } finally {
      setUploading(false);
      toast.success('Uploaded successfully');
    }
  };

  function formatFileSize(size: number) {
    if (size < 1024) return size + ' bytes';
    else if (size < 1024 * 1024) return (size / 1024).toFixed(2) + ' KB';
    else return (size / (1024 * 1024)).toFixed(2) + ' MB';
  }

  const handleClearImage = () => {
    setPreviewUrl(null);
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (!imageFile) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(imageFile);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [imageFile]);

  const containerClass = classNames(
    'flex flex-col gap-2 flex-1',
    containerClassName,
    {}
  );
  return (
    <div className={containerClass}>
      {label && (
        <label className='font-semibold'>
          {label}
          {requiredLabel && <span className='text-red-700'>*</span>}
        </label>
      )}
      <div className='flex gap-3 items-center'>
        <input
          type='file'
          id={id}
          name={name}
          multiple={multiple}
          accept='image/*'
          ref={inputRef}
          onChange={handleImageFileChange}
          className='hidden'
        />
        <Label
          htmlFor={id}
          className='border-dashed border-2 border-gray-400 rounded'
          title={
            <div className='w-fit flex flex-col gap-3 p-4 text-center cursor-pointer text-gray-500 items-center capitalize'>
              <IconUpload />
              <div className='lg:text-nowrap'>Drag and Drop your image</div>
            </div>
          }
        />
        {previewUrl && imageFile && (
          <div className='relative flex gap-3 items-center w-fit h-full rounded group'>
            <div className='rounded w-24 h-24'>
              <img
                src={previewUrl}
                alt='Selected Preview'
                className='rounded object-fill w-24 h-24 p-1'
              />
              {uploading && (
                <div className='progress-container rounded-full my-1 w-full bg-gray-400 h-1'>
                  <div
                    className='progress-bar bg-blue-700 h-1 rounded-full transition-[width] duration-300 ease-in-out'
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                  <div className='progress-text text-xs'>{uploadProgress}%</div>
                </div>
              )}
            </div>
            <div className='p-4 text-gray-700'>
              <p className='text-sm font-semibold'>{imageFile.name}</p>
              <p className='text-xs'>{formatFileSize(imageFile.size)}</p>
            </div>

            <div
              className='absolute top-1 right-1 p-0.5 hidden bg-white rounded-full group-hover:block cursor-pointer'
              onClick={handleClearImage}
            >
              <IconX color='red' width={16} height={16} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default ImageUpload;
