
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { GoogleGenerativeAI } from '@google/generative-ai';
import './styles/profile.css'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";

interface ProfileParams extends Record<string, string | undefined> {
  username: string;
}

interface data {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string | null;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  name: string | null;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  hireable: boolean | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string; // could also be Date
  updated_at: string; // could also be Date
}


const Profile: React.FC = () => {

    const ai = new GoogleGenerativeAI(`${import.meta.env.GEMINI_SECRET}`);
 

    const [data, setData] = useState<data>()
    const [analysis, setAnalysis] = useState("")
    const [rating, setRating] = useState("")
    const [progress, setProgress] = useState('');
    const [progressColor, setProgressColor] = useState<string>('');
    const [changedUsername, setChangedUsername]  = useState('')

    const [readme, setReadme] = useState('')

        useEffect(() => {
          if (rating) {
            setTimeout(() => {
              setProgress(rating);
            }, 100); // small delay so animation triggers
          }
          if(parseInt(rating)>70){
            setProgressColor("green")
          } else if (parseInt(rating)>60){
            setProgressColor("yellow")
          } else if(parseInt(rating)>50){
            setProgressColor("orange")
          } else {
            setProgressColor("red")
          }
        }, [rating]);

    const { username } = useParams<ProfileParams>();

   

      useEffect(() => {
      if (!username) return;

      const fetchAIReview = async () => {
        try {
          const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });


          const prompt = `
          Analyze this GitHub profile: https://github.com/${username}

          Give me:
          1. A detailed review (5–10 lines) in simple English.
          2. Then give a final score out of 100.
          3. OUTPUT FORMAT MUST BE EXACTLY THIS:

          This is the review from your profile:
          <review text>,,<score>

          
          `;

          const result = await model.generateContent(prompt);
          const text = result.response.text();
          console.log(typeof text)
          const analysisW:string = text.split(",,")[0]
          const ratingW: string = text.split(",,")[1]
          setAnalysis(analysisW)
          setRating(ratingW)
          console.log('AI Result:', text);
        } catch (err) {
          const randomRating = Math.floor(Math.random()*100 +1);
          setAnalysis("this is the demo analysis it is not perform by ai buz of the ai limit cross you can checkout next day.. hope you will like this product :)")
          setRating(`${randomRating}`)
          console.error('AI Error:', err);
        }
      };

      fetchAIReview();
    }, [username]);


    useEffect(() => {
      const url = `https://api.github.com/users/${username}`

       axios.get(url, {
        headers: {
          Authorization: import.meta.env.GITHUB_AUTH_TOKEN
        }
       })
        .then((res)=>{
          console.log(res.data)
          const rData = res.data;
          setData(rData);
        })
        .catch((err)=>{console.log(err)})

    }, [username])

    useEffect(()=>{
      const url = `https://raw.githubusercontent.com/${username}/${username}/refs/heads/main/README.md`
      axios.get(url)
        .then((res)=>{
          console.log(res.data)
          const rData = res.data
          setReadme(rData);
        })
        .catch((err)=> console.log(err))
    }, [username])

    useEffect(()=>{console.log("data", data)}, [data])
    
    const changeUsername = (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(username)
    const sortedUrl = `${window.location.href.split("/")[0]}//${window.location.href.split("/")[2]}/`
    console.log(sortedUrl)
    const url: string = `${sortedUrl}profile/${changedUsername}`
    window.location.href = url;
  }

  
    return (
    <>
       <main className='flex justify-center items-center text-white flex-col ml-1 mr-1'  >
        <br />
          <form action="" className='border mb-2 w-full flex gap-3 items-center p-3 sm:w-[60%]' onSubmit={(e)=> changeUsername(e)}>
            <input type="text" placeholder={username} value={changedUsername} className='border w-[80%] p-2' onChange={
              
              (e)=>{
                setChangedUsername(e.target.value)
              }
            }/>
            <button className='w-[20%] border p-2 cursor-pointer hover:bg-red-200 hover:text-black'>View ↗️</button>
          </form>
          
          
          
        {/* Profile Box */}
        <div className="ps-inline grid grid-cols-[1fr]  sm:grid-cols-[3fr_1fr]">
        <div className="profile-box border flex flex-col  p-3   ">
          <div className="pp-first flex gap-2 items-center mb-2">
            <div className="ppf-first">
              <img src={data ? data.avatar_url : "error"} alt="" className='max-w-[150px]'/>
            </div>
            <div className="ppf-second">
              <h1 className='text-xl '>{data ? data.name : "error"}</h1>
              <hr />
              
              <h1 className='flex gap-1'> 
                <svg className='w-5 ' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 2C6.47598 2 2.00098 6.475 2.00098 12C2.00098 16.425 4.86348 20.1625 8.83848 21.4875C9.33848 21.575 9.52598 21.275 9.52598 21.0125C9.52598 20.775 9.51348 19.9875 9.51348 19.15C7.00098 19.6125 6.35098 18.5375 6.15098 17.975C6.03848 17.6875 5.55098 16.8 5.12598 16.5625C4.77598 16.375 4.27598 15.9125 5.11348 15.9C5.90098 15.8875 6.46348 16.625 6.65098 16.925C7.55098 18.4375 8.98848 18.0125 9.56348 17.75C9.65098 17.1 9.91348 16.6625 10.201 16.4125C7.97598 16.1625 5.65098 15.3 5.65098 11.475C5.65098 10.3875 6.03848 9.4875 6.67598 8.7875C6.57598 8.5375 6.22598 7.5125 6.77598 6.1375C6.77598 6.1375 7.61348 5.875 9.52598 7.1625C10.326 6.9375 11.176 6.825 12.026 6.825C12.876 6.825 13.726 6.9375 14.526 7.1625C16.4385 5.8625 17.276 6.1375 17.276 6.1375C17.826 7.5125 17.476 8.5375 17.376 8.7875C18.0135 9.4875 18.401 10.375 18.401 11.475C18.401 15.3125 16.0635 16.1625 13.8385 16.4125C14.201 16.725 14.5135 17.325 14.5135 18.2625C14.5135 19.6 14.501 20.675 14.501 21.0125C14.501 21.275 14.6885 21.5875 15.1885 21.4875C19.259 20.1133 21.9999 16.2963 22.001 12C22.001 6.475 17.526 2 12.001 2Z"></path></svg>
                {data ? data.login : "error"}
              </h1>
              <p className='max-w-[80%]'>"<code>{data ? data.bio : "error"}</code>"</p>
            </div>
          </div>
          <div className="pp-second flex items-center justify-evenly border-t">

            <div className="follwers flex flex-col text-center">
              <span>Followers</span>
              {data ? data.followers : "error"}
            </div>
            <div className="following flex flex-col text-center">
              <span>Following</span>
              {data ? data.following : "error"}
            </div>
            <div className="repos flex flex-col text-center">
             <span>Repos</span> 
              {data ? data.public_repos : "error text-center"}
            </div>

          </div>
        </div>

        {/* Score Box  */}
          <div className="score-box-top border flex flex-col ">
              <h1 className='text-xl h-[15%] text-center m-2 '>🏆 Profile Score</h1>
          <div className="score-box border flex items-center justify-center flex-col p-2 h-[90%]">

            <div className="w-full bg-gray-200 rounded-full h-8 dark:bg-gray-700 ">
              <div className='bg-blue-600 h-8 rounded-full' style={{width: `${progress}%`}}></div>
            </div>
            <h1 className='text-4xl font-bold' style={{color: `${progressColor}`}}>{rating ? rating : "Loading.."}/100</h1>
          </div>
    </div>
    </div>
        
        {/* Ai Report  */}

          <div className="ai-report border w-full sm:w-[60%] mt-5">
            <h1 className='text-center text-xl p-1'>🧠 AI Analysis</h1>
            <hr />
            <p className='p-2'>{analysis ? analysis : "Loading..."}</p>
          </div>

        {/* Reamd ME file  */}

          <div className="read-me border mt-5 w-full sm:w-[60%]">
           <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
              >
                {readme}
              </Markdown>
          </div>


      </main>
    </>
  )
}

export default Profile