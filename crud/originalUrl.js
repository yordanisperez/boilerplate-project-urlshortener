const url= require('../model/urlSchema');



const createNewUrl=async function(urlJson,done){ 
  let doc = new url (urlJson);
  await doc.save()
          .then((saveDoc)=>
          {
              done(null,doc)
          })
          .catch((error)=>{
              done(error,doc)
          })
  return doc;
}


const findUrl = async (reqUrl, done) => {
    return await url.findOne({original_url:reqUrl},(error,resp)=>{
      if (error)
      {
        console.log(error);
      }
      done(error,resp);
    })
    
  };

const findChortUrl = async (shortUrl,done)=>{
  return await url.findOne({short_url:shortUrl},(error,resp)=>{
    if (error)
    {
      console.log(error);
    }
    done(error,resp);
  })
}

  exports.findUrl = findUrl;
  exports.createNewUrl=createNewUrl;
  exports.findChortUrl=findChortUrl;