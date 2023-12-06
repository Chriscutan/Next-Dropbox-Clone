import Link from "next/link";
import {ArrowRight} from "lucide-react";

export default function Home() {
  return (
    <main className="">
      <div className="flex flex-col lg:flex-row items-center bg-[#2b2929] dark:bg-slate-800"> 
        <div className="p-10 flex flex-col bg-[#2b2929] dark:bg-slate-800 
        text-white space-y-5">
          <h1 className="text-5xl font-bold">Welcome to Dropbox. <br /> Storing everything for you and your business needs. All in one place.</h1>
        
          <p className="pb-20">
            Enhance your personal storage with Dropbox.
          </p>

          <Link href={"/dashboard"} className="flex items-center p-5 w-fit bg-blue-700">
            Try it for free
            <ArrowRight className="mr-10"/>
          </Link>
        </div>

        <div className="bg-[#1e1919] dark:bg-slate-800 h-full p-10">
          <video autoPlay loop muted className="rounded-lg">
            <source 
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag
          </video>
        </div>
      </div>

      <p className="text-center font-bold text-xl pt-5">Disclaimer</p>
      <p className="text-center font-light p-2">
        This video is made for educational purposes only.
      </p>
    </main>
  )
}
