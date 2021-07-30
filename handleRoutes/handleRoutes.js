var validUrl = require('valid-url');
const origUrl=require('../crud/originalUrl');
countShorted=require('../crud/shortUrlCount');
const TIMEOUT=10000;

function handleHom(req, res) {
  console.log("Manipulador de Peticion 'handleHom' fue llamado. ");
  res.sendFile(process.cwd() + '/views/index.html');
  
}


function handleShortUrl(req, res,next) {
 
  console.log("Manipulador de Peticion 'handleShortUrl' fue llamado. ");

function createNewUrl(jsonUrl){
 
  let t=setTimeout(()=>
  {
    next({ message: "timeout" });
  },TIMEOUT);                          
  origUrl.createNewUrl(jsonUrl,(error,data)=>
  {
    clearTimeout(t);
    if (error)
    {
        return next(error);
    }
    res.json(jsonUrl)
  })
}

  try 
  {
    const reqURL = req.body.url;
    if(validUrl.isWebUri(reqURL))
    {
          let t=setTimeout(()=>
          {
            next({ message: "timeout" });
          },TIMEOUT);
        origUrl.findUrl(reqURL,(error,data)=>
        {
            clearTimeout(t);
            if (error)
            {
              return next(error);
            }
            if (data) //take the info store of url
            {
                const {original_url, short_url} = data;
                res.json({original_url, short_url});
            }  
            else   //create the info of url
            {
             
              let t1=setTimeout(()=>
              {
                next({ message: "timeout" });
              },TIMEOUT);
              countShorted.createShortedUrl((error,datIndex)=>
              {
                clearTimeout(t1);
                if (error) 
                {
                  return next(error);
                }
                console.log(datIndex);
                if (!datIndex) //Create one index first
                {
                  console.log('Create one index first')
                  let t2=setTimeout(()=>
                  {
                    next({ message: "timeout" });
                  },TIMEOUT);                 
                  countShorted.createIndexUrl((error,datIndex)=>
                  {
                      clearTimeout(t2);
                      if (error)
                      {
                        return next(error);
                      }
                      createNewUrl({   original_url: reqURL ,short_url: datIndex.index});

                  })
                }
                else//datIndex is the index update
                {
                  console.log('datIndex is the index update')
                  createNewUrl({   original_url: reqURL ,short_url: datIndex.index});              
                }
               
               
              })
              
            }          
        });
    
    }
  }
  catch (err) {
    console.log(err);
  }

  
}
    
function handleRedirecShortUrl(req, res,next) 
{
  try
  {
  console.log("Manipulador de Peticion 'handleRedirecShortUrl' fue llamado. ");
  const shortUrl = req.params.short_url;
        let t=setTimeout(()=>
        {
          next({ message: "timeout" });
        },TIMEOUT);
        origUrl.findChortUrl(shortUrl,(error,data)=>{
           clearTimeout(t);
           if (error)
             return next(error);
           
           if (data)
              return res.redirect(data.original_url);
           else
              return res.json({error: 'Not a valid URL'});
        });
  } 
  catch(error){
        console.log(error);
      }


}
//handleRedirecShortUrl
exports.handleHom=handleHom;
exports.handleShortUrl=handleShortUrl;
exports.handleRedirecShortUrl=handleRedirecShortUrl;
 