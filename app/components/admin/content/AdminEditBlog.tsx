'use client';

import { useCallback, useMemo, useState } from 'react';
import SelectComp from '../../input/SelectComp';
import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { resizeBlogImage } from '@/app/lib/imageResizer';
import Heading from '../../Heading';
import { BLOG_CATEGORY, CATEGORY_OPTION } from '@/types/BlogTypes';
import axios from 'axios';

interface AdminEditBlogProps {}

const AdminEditBlog: React.FC<AdminEditBlogProps> = ({}) => {
  const [listings, setListings] = useState<any[]>([]);
  const [selectedListing, setSelectedListing] = useState('');
  const [content, setContent] = useState('');
  const [imgSrc, setImgSrc] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const currentUser = {
    id: `6478c82877ecb0881e513544`,
    nickname: `Misaeng`,
    name: ``,
    image: ``,
    newImage: `https://misaeng.s3.amazonaws.com/profile/6424c20d9b32145ab46de5bd/00f0034e-fa30-4c60-990d-8866531fa553`,
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

  const fetchCategoryListing = useCallback((category: string) => {
    axios
      .post(`/api/blogEdit`, { category })
      .then((res) => setListings(res.data.result));
  }, []);

  const fetchSelectedListing = useCallback((blogId: string) => {
    axios
      .post(`/api/blogEdit`, { blogId })
      .then((res) => setContent(res.data.result[0].content));
  }, []);

  const subtitle = `썸네일은 업로드하는 첫번째 사진으로 자동 저장됨`;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .put(`/api/blogEdit`, {
        blogId: selectedListing,
        content,
      })
      .then((response) => {
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
    <div className='flex flex-col w-full h-full overflow-y-scroll gap-4'>
      <Heading title={'블로그 수정하기'} subtitle={subtitle} />
      <div className='flex w-full gap-4 px-4'>
        <div className='w-1/5'>
          <SelectComp
            small
            placeholder={'카테고리'}
            options={CATEGORY_OPTION}
            onChange={(e) => {
              fetchCategoryListing(e);
            }}
          />
        </div>
        <div className='w-4/5'>
          <SelectComp
            small
            placeholder={'제목을 선택해주세요'}
            options={
              listings.length > 0 ? listings : [{ label: '', value: '' }]
            }
            onChange={(e) => {
              setSelectedListing(e);
              fetchSelectedListing(e);
            }}
          />
        </div>
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
          블로그 수정하기
        </button>
      </div>
    </div>
  );
};
export default AdminEditBlog;
