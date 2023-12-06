"use client"

import { cn } from '@/lib/utils';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import { addDoc, collection, serverTimestamp, updateDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Dropzone from 'react-dropzone'
import { db, storage } from '@/firebase';
import toast from "react-hot-toast";

function DropzoneCard() {

  const [loading, setLoading] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onabort = () => console.log("File reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    })
  };

  const uploadPost = async (selectedFile: File) => {
    if(loading) return;

    if(!user) return;

    setLoading(true);

    const toastId = toast.loading("Uploading....");

    // addDoc -> users/userID/files
    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      userId: user.id,
      filename: selectedFile.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
    });

    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

    await uploadBytes(imageRef, selectedFile).then(async () => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadURL: downloadURL,
      });
    });

    setLoading(false);

    toast.success("Uploaded Successfully!!", {
      id: toastId,
    })
  }

  //max file size 20MB
  const maxSize = 20971520;

  return (
    <Dropzone minSize={0} maxSize={maxSize} onDrop={onDrop}>
      {({getRootProps, getInputProps, isDragActive, isDragReject, fileRejections }) => {

        const isFileTooLarge = fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
       return (
      <section className='m-4'>
        <div {...getRootProps()}
          className={cn(
            "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center", 
            isDragActive ? "bg-[#035ffe] text-white animate-pulse" 
            : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
          )}
        >
           <input {...getInputProps()} />
           {!isDragActive && "Click here or drop a file to upload!"}
           {isDragActive && !isDragReject && "Drop to upload this file!"}
           {isFileTooLarge && (<div className='text-danger mt-2'>
              File is too large
           </div>)}
        </div>
      </section>
   )}}
</Dropzone>
  )
}

export default DropzoneCard