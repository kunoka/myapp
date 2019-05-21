export const getRedirectPath = ({type, avatar}) => {
  let url;
  if(type === 'boss') {
    url = '/boss';
  }else if(type === 'genius') {
    url = '/genius';
  }
  if(!avatar) {
    url += 'info'
  }
  return url;
}