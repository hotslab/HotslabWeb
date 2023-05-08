import Layout from "@/components/Layout"
import Image from 'next/image'

export default function Home() {
  return (
    <Layout>
      <div className="bg-white">
        <div className="min-h-screen flex flex-col items-center justify-center" id="hotslab-logo">
          <div id="logo-image" className="p-0 mt-10">
            <Image
              src="/assets/hotslab.svg"
              alt="Hotslab lLogo"
              height={100}
              width={100}
              className="h-[200px] min-[566px]:h-[250px] w-full"
            />
          </div>
          <h1 id="logo-text" className="text-white pt-10 text-xl9 mb-10">HOTSLAB</h1>
          <div className="flex justify-center items-center flex-wrap gap-10 justify-center mb-10 mx-10">
            <div className="px-8 py-6 w-full min-[480px]:w-52 bg-base-100 hotslab-shadow grid gap-5">
              <div className="flex justify-between items-center">
                <Image
                  src="/assets/computer.svg"
                  alt="Software Development"
                  height={100}
                  width={100}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col justify-between items-center text-center w-full">
                <h2 className="card-title">Software Development</h2>
              </div>
            </div>
            <div className="px-8 py-6 w-full min-[480px]:w-52 bg-base-100 hotslab-shadow grid gap-5">
              <div className="flex justify-between items-center">
                <Image
                  src="/assets/tablet.svg"
                  alt="App Development"
                  height={100}
                  width={100}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col justify-between items-center text-center w-full">
                <h2 className="card-title">Mobile Applications</h2>
              </div>
            </div>
            <div className="px-8 py-6 w-full min-[480px]:w-52 bg-base-100 hotslab-shadow grid gap-5">
              <div className="flex justify-between items-center">
                <Image
                  src="/assets/artboard.svg"
                  alt="Graphic Design"
                  height={100}
                  width={100}
                  className="w-full"
                />
              </div>
              <div className="flex flex-col justify-between items-center text-center w-full">
                <h2 className="card-title">Graphic Designs</h2>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{`
          
          #hotslab-logo {
            background-color: red;
            font-weight: bold;
            width: 100%;
            text-shadow: 3px 3px 7px black;
            color: white;
            /*animation*/
            -webkit-animation-name: logocolor;
            /* Chrome, Safari, Opera */
            -webkit-animation-duration: 30s;
            /* Chrome, Safari, Opera */
            -webkit-animation-iteration-count: infinite;
            /* Chrome, Safari, Opera */
            animation-name: logocolor;
            animation-duration: 30s;
            animation-iteration-count: infinite;

          }

          .hotslab-shadow {
            box-shadow: 3px 3px 10px black;
          }

          /* Chrome, Safari, Opera */
          @-webkit-keyframes logocolor {
            0% {
              background-color: red;
            }
            20% {
              background-color: purple;
            }
            40% {
              background-color: orangered;
            }
            60% {
              background-color: dodgerblue;
            }
            80% {
              background-color: green;
            }
            100% {
              background-color: red;
            }
          }

          /* Standard syntax */
          @keyframes logocolor {
            0% {
              background-color: red;
            }
            20% {
              background-color: purple;
            }
            40% {
              background-color: orangered;
            }
            60% {
              background-color: dodgerblue;
            }
            80% {
              background-color: green;
            }
            100% {
              background-color: red;
            }
          }

          #logo-image {
            box-shadow: 3px 3px 10px black;
            /* image logo rotation animation*/
            -webkit-animation-name: logoimage;
            /* Chrome, Safari, Opera */
            -webkit-animation-delay: 1s;
            /* Chrome, Safari, Opera */
            -webkit-animation-duration: 1s;
            /* Chrome, Safari, Opera */
            -webkit-animation-iteration-count: 1;
            /* Chrome, Safari, Opera */
            animation-name: logoimage;
            animation-delay: 1s;
            animation-duration: 1s;
            animation-iteration-count: 1;
          }

          /* LOGO IMAGE ANIMATION */
          /* Chrome, Safari, Opera */
          @-webkit-keyframes logoimage {
            0% {
              -ms-transform: rotate(0deg);
              /* IE 9 */
              -webkit-transform: rotate(0deg);
              /* Safari */
            }
            100% {
              -ms-transform: rotate(360deg);
              /* IE 9 */
              -webkit-transform: rotate(-360deg);
              /*  Safari */
            }
          }

          /* Standard syntax */
          @keyframes logoimage {
            0% {
              transform: rotate(0deg);
            }

            100% {
              transform: rotate(360deg);
            }
          }

          /* LOGO TEXT */
          #logo-text {
            font-size: 45px;
            position: relative;
            font-weight: bolder;
            text-shadow: 3px 3px 7px black;
            /*logo text movement animation*/
            -webkit-animation-name: logomove;
            /* Chrome, Safari, Opera */
            -webkit-animation-duration: 1s;
            /* Chrome, Safari, Opera */
            -webkit-animation-iteration-count: 1;
            /* Chrome, Safari, Opera */
            animation-name: logomove;
            animation-duration: 1s;
            animation-iteration-count: 1;
          }

          /* LOGO TEXT ANIMATION */
          /* Chrome, Safari, Opera */
          @-webkit-keyframes logomove {
            0% {
              left: 2500px;
              top: 0px;
            }
            100% {
              left: 0px;
              top: 0px;
            }
          }

          /* Standard syntax */
          @keyframes logomove {
            0% {
              left: 2500px;
              top: 0px;
            }
            100% {
              left: 0px;
              top: 0px;
            }
          }
        `}</style>
      </div>
    </Layout>
  )
}
