const countUrl=require('../model/urlCount')

const createShortedUrl=async function(done){
    let index = await countUrl.findOneAndUpdate({}, {$inc: {index: 1}},{new: true, useFindAndModify: false},done)
    return index;
}

/*This function only call the first that run the service */
const createIndexUrl=async function(done){ 
    let doc = new countUrl ({index:1});
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

exports.createShortedUrl = createShortedUrl;
exports.createIndexUrl = createIndexUrl;