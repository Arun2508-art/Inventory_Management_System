import { IconUpload, IconX } from '@tabler/icons-react';
import axios from 'axios';
import classNames from 'classnames';
import { useRef, useState, type Dispatch, type SetStateAction } from 'react';
import { toast } from 'react-toastify';
import type { ImageType } from '../utills/types';
import Button from './Button';
import Label from './Label';

export interface BaseProps {
  label?: string;
  id?: string;
  containerClassName?: string;
  requiredLabel?: boolean;
  name?: string;
  multiple?: boolean;
  // setUploadedImageData?: Dispatch<
  //   SetStateAction<ImageCloudinary[] | ImageCloudinary>
  // >;
}

// interface MultipleProps extends BaseProps {
//   multiple: true;
//   setUploadedImageData?: Dispatch<SetStateAction<ImageCloudinary[]>>;
// }

// interface SingleProps extends BaseProps {
//   multiple?: false;
//   setUploadedImageData?: Dispatch<SetStateAction<ImageCloudinary>>;
// }

type ConditionalProps =
  | {
      multiple: true;
      setUploadedImageData?: Dispatch<SetStateAction<ImageType[]>>;
    }
  | {
      multiple?: false;
      setUploadedImageData?: Dispatch<SetStateAction<ImageType>>;
    };

// export type ImageUploadProps = MultipleProps | SingleProps;

export type ImageUploadProps = BaseProps & ConditionalProps;

const ImageUpload = ({
  label,
  id,
  containerClassName,
  requiredLabel,
  name,
  multiple,
  setUploadedImageData,
}: ImageUploadProps) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [disabledUpload, setDisabledpload] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDisabledpload(false);
    if (multiple) {
      const data = event.target.files;
      if (!data || data.length === 0) return;

      const selectedFiles = Array.from(data);
      setImageFiles(selectedFiles);
      setPreviewUrl(selectedFiles.map((file) => URL.createObjectURL(file)));
      return;
    }
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setImageFile(selectedFile);
      setPreviewUrl([URL.createObjectURL(selectedFile)]);
    }
  };

  const handleUploadImageToCloudinary = async () => {
    let URL = 'http://localhost:5000/api/upload/file';
    try {
      setUploading(true);
      setUploadProgress(0);
      const formData = new FormData();
      if (multiple) {
        imageFiles.forEach((files) => formData.append('images', files));
        URL = 'http://localhost:5000/api/upload/files';
      } else if (imageFile) {
        formData.append('image', imageFile);
      } else {
        toast.error('No image selected');
        return;
      }

      const response = await axios.post(URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (ProgressEvent) => {
          const total = ProgressEvent.total;
          const progressCompleted = total
            ? Math.round((ProgressEvent.loaded * 100) / total)
            : 0;
          setUploadProgress(progressCompleted);
        },
      });
      if (response.data.success) {
        setUploadedImageData?.(response.data.data);
        // setPreviewUrl([]);
        // if (inputRef.current) {
        //   inputRef.current.value = '';
        // }
        // if (multiple) {
        //   setImageFiles([]);
        // } else {
        //   setImageFile(null);
        // }
        setDisabledpload(true);
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

  const handleClearImage = (indexToRemove: number) => {
    URL.revokeObjectURL(previewUrl[indexToRemove]);
    setPreviewUrl((prev) => prev.filter((_, index) => index !== indexToRemove));
    if (multiple) {
      setImageFiles((prev) =>
        prev.filter((_, index) => index !== indexToRemove)
      );
    } else {
      setImageFile(null);
    }
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

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
              <div className='lg:text-nowrap'>{`${
                multiple ? 'Upload upto 5 images' : 'Upload your image'
              }`}</div>
            </div>
          }
        />
        {previewUrl.length > 0 && (
          <>
            {previewUrl.map((src, index) => (
              <div
                className='relative flex gap-3 items-center w-fit h-full rounded group'
                key={index}
              >
                <div className='rounded w-24 h-24'>
                  <img
                    src={src}
                    alt='Selected Preview'
                    className='rounded object-fill w-24 h-24 p-1'
                  />
                  {uploading && (
                    <div className='progress-container rounded-full my-1 w-full bg-gray-400 h-1'>
                      <div
                        className='progress-bar bg-blue-700 h-1 rounded-full transition-[width] duration-300 ease-in-out'
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                      <div className='progress-text text-xs'>
                        {uploadProgress}%
                      </div>
                    </div>
                  )}
                </div>
                {/* <div className='p-4 text-gray-700'>
              <p className='text-sm font-semibold'>{imageFile.name}</p>
              <p className='text-xs'>{formatFileSize(imageFile.size)}</p>
            </div> */}
                <div
                  className='absolute top-1 right-1 p-0.5 hidden bg-white rounded-full group-hover:block cursor-pointer'
                  onClick={() => handleClearImage(index)}
                >
                  <IconX color='red' width={16} height={16} />
                </div>
              </div>
            ))}
            <div>
              <Button
                onClick={handleUploadImageToCloudinary}
                type='button'
                disabled={disabledUpload}
              >
                Upload
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default ImageUpload;
