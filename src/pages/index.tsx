import { useRouter } from "next/router"
import Layout from "@/components/Layout"
import hotslabImage from "../../public/assets/hotslab.svg"
import computerImage from "../../public/assets/computer.svg"
import tabletImage from "../../public/assets/tablet.svg"
import artBoardImage from "../../public/assets/artboard.svg"
import Head from "next/head"


export default function Home() {

  const keyWords = "JavaScript,Typescript, PHP, HTML, SQL, CSS, Java, Python, Bash, Git, Gitlab, Github, Node, AdonisJS, Docker, Kubernetes, Jquery, AngularJS, React, Angular, Vue, Laravel, Yii, Symfony, GraphQL, Quasar, NextJS, Redux, npm, composer, Cordova, Apollo, WebRTC, SocketIO, ElasticSearch, Capacitor, SOAP, HTTP, REST API, JSONAPI, AWS, Linux, MySQL, MariaDB, Postgre, MSSQL, MongoDB, Redis, Nginx, Apache, Wordpress, WooCommerce, TailwindCSS, Bootstrap, JIRA, Notion, Slack, Google Cloud, Express, Koa, Cypress, Electron, Gimp, Photoshop, InkScape, GooglePlay, IOS, Xcode, Android Studio, Puppeteer, XML, Markdown, CPanel"
  
  const router = useRouter()

  async function goTo(route: string) {
    
    router.push(route)
  }

  return (
    <Layout>
      <Head>
        <title>Hotslab</title>
        <meta property='og:title' content="Hotslab" />
        <meta name="description" property='og:description' content="Hotslab provides affordable and quality services in web and mobile app development, custom graphic designs and webmaster services." />
        <meta name="author" content="Joseph Nyahuye" />
        <meta name="keywords" content={keyWords} />
      </Head>
      <div className="bg-white">
        <div className="min-h-screen flex flex-col items-center justify-center" id="hotslab-logo">
          <div
            id="logo-image"
            title="Software Development"
            style={{
              backgroundImage: `url(${hotslabImage.src})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center"
            }}
            className="mt-10 h-[120px] w-[120px]"
          >
          </div>
          <h1 id="logo-text" className="font-bold text-white text-xs my-10">HOTSLAB</h1>
          <div className="flex items-center flex-wrap gap-10 justify-center mb-10 mx-10">
            <div 
              onClick={() => goTo(`/developer`)} 
              className="px-8 py-6 bg-base-100 w-[200px] h-[200px] hotslab-shadow grid gap-5 cursor-pointer"
            >
              <div
                title="Developer profile"
                style={{
                  backgroundImage: `url(${tabletImage.src})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center"
                }}
                className="w-full h-[80px]"
              >
              </div>
              <div className="flex flex-col justify-between items-center text-center w-full h-full">
                <h2 className="font-bold text-md text-white">Profile</h2>
              </div>
            </div>
            <div 
              onClick={() => goTo(`/projects`)} 
              className="px-8 py-6 bg-base-100 w-[200px] h-[200px] hotslab-shadow grid gap-5 cursor-pointer"
            >
              <div
                title="Developer projects"
                style={{
                  backgroundImage: `url(${artBoardImage.src})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center"
                }}
                className="w-full h-[80px]"
              >
              </div>
              <div className="flex flex-col justify-between items-center text-center w-full h-full">
                <h2 className="font-bold text-md text-white">Projects</h2>
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
