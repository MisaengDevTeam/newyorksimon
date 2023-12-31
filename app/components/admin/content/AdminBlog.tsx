'use client';

import axios from 'axios';
// import ReactQuill from 'react-quill';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { resizeBlogImage } from '@/app/lib/imageResizer';
import { useMemo, useState } from 'react';
import SelectComp from '../../input/SelectComp';
import Heading from '../../Heading';
import { BLOG_CATEGORY, CATEGORY_OPTION } from '@/types/BlogTypes';
import dynamic from 'next/dynamic';

interface AdminBlogProps {}

const AdminBlog: React.FC<AdminBlogProps> = ({}) => {
  const [content, setContent] = useState('');
  const [imgSrc, setImgSrc] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = {
    id: `6478c82877ecb0881e513544`,
    nickname: `Misaeng`,
    name: ``,
    image: ``,
    newImage: `https://misaeng.s3.us-east-1.amazonaws.com/profileImage/6478c82877ecb0881e513544/2023-06-25T01%3A13%3A11.219Z/ed05522b-9c16-4aff-ac23-352e677635d5`,
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      category: null,
      title: null,
      hot: null,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  const writeTime = new Date().toISOString();

  const handleChange = (value: any) => {
    setContent(value);
  };

  const imageHandler = async () => {
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      if (input.files) {
        const file = input.files[0];
        console.log(file);

        const reader = new FileReader();
        reader.readAsArrayBuffer(await resizeBlogImage(file));
        let blobPic = new Blob();

        reader.onloadend = async () => {
          blobPic = new Blob([new Uint8Array(reader.result as ArrayBuffer)], {
            type: file.type,
          });

          const url = await axios.post(
            `/api/pic/blogImage/${currentUser?.id}/${writeTime}`
          );

          const response = await fetch(url.data.signedUrl, {
            method: 'PUT',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body: blobPic,
          });

          console.log(response);

          const resultPicture = response.url.split('?')[0];
          setImgSrc((prev) => [...prev, resultPicture]);
          setContent(
            (prev) => prev + `<image src="${resultPicture}" alt="img"/>`
          );
        };
      }
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ align: [] }],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image'],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'list',
    'bullet',
    'link',
    'image',
  ];

  const subtitle = `썸네일은 업로드하는 첫번째 사진으로 자동 저장됨`;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post(`/api/blogRegister`, {
        ...data,
        uid: currentUser?.id,
        content,
        thumbnail: imgSrc[0],
        createdAt: writeTime,
        author: currentUser?.nickname || currentUser?.name,
        authorPic: currentUser?.newImage || currentUser?.image,
      })
      .then((response) => {
        console.log(response);
        // roommateRegisterModal.onClose();
        reset();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
        location.reload();
      });
  };

  return (
    <div className='w-full h-full overflow-y-scroll'>
      <div className='flex flex-col gap-6'>
        <Heading title={'블로그 작성'} subtitle={subtitle} />
        <div className='flex flex-col lg:flex-row gap-4 px-4'>
          <div className='w-full lg:w-1/3 xl:w-1/4 2xl:w-1/5'>
            <SelectComp
              small
              placeholder={'카테고리'}
              options={CATEGORY_OPTION}
              onChange={(value) => {
                setCustomValue('category', value);
              }}
            />
          </div>
          <div className='w-full lg:w-1/2 xl:w-1/4 2xl:w-1/5'>
            <SelectComp
              small
              placeholder={'이번달 핫토픽?'}
              options={[
                { label: 'Yes', value: 'Yes' },
                { label: 'No', value: 'No' },
              ]}
              onChange={(value) => {
                setCustomValue('hot', value);
              }}
            />
          </div>
          <input
            placeholder='제목을 입력해주세요'
            onChange={(e) => setCustomValue('title', e.target.value)}
            className='w-full h-[46px] px-4 outline-none border border-neutral-500 rounded-lg'
          />
        </div>
        <div className='px-4'>
          <ReactQuill
            value={content}
            onChange={handleChange}
            placeholder='Write something...'
            modules={modules}
            formats={formats}
          />
        </div>
        <div className='w-full flex flex-col sm:flex-row justify-center items-center gap-6'>
          <button
            onClick={handleSubmit(onSubmit)}
            className='py-2 px-4 bg-[#EC662A] text-[#FFF] rounded-xl w-full sm:w-[300px]'
          >
            블로그 작성하기
          </button>
        </div>
      </div>
    </div>
  );
};
export default AdminBlog;
