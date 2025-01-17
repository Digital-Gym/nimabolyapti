import axios from "axios";

const url = "https://api.github.com/search";
const users = "users?q=location:uzbekistan";
const repos = "repositories?q=uzbek&sort=stars";

export async function getSome(givenUrl){
  try{
    const reqUrl = givenUrl ?? `${url}/${repos}`;
    const res = await axios.get(reqUrl);

    if(res && res.data){
      return { data: res.data, link: res.headers.link };
    }
  } catch(err){
    console.error(err);
  }
}