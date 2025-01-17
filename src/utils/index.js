export function extractLink(rawStr){
  let result = "";
  for(let i = 0; i < rawStr.length; i++){
    if(rawStr[i] == '<'){
      continue;
    } else if(rawStr[i] == '>'){
      break;
    }
    result += rawStr[i];
  }
  return result;
}