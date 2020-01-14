var token = "";
var url = "https://api.telegram.org/bot" + token;
var WebAppUrl = "https://script.google.com/macros/s/AKfycbyg8cHfBo4_oHnKYZHHNfqVqxJFTYkhdVKyDBr7E5nDlwkMBbg/exec";
var ssId = "1wZsymXNcfS1UpnUJSsGiKtbz6Z35I0ntmmPVNy4L8Bo";
var myId = "235955893";

function setWebhook() {
  var Response = UrlFetchApp.fetch(url + "/setWebhook?url=" + WebAppUrl);
  Logger.log(Response.getContentText());
}

function sendText(id, text) {
  var Response = UrlFetchApp.fetch(url + "/sendMessage?chat_id=" + id + "&text=" + encodeURIComponent(text));
  Logger.log(Response.getContentText());
}

function forwardText(chat, from, message) {
  var Response = UrlFetchApp.fetch(url + "/forwardMessage?chat_id=" + chat + "&from_chat_id=" + from + "&message_id=" + message);
  Logger.log(Response.getContentText());
}

function sendAnimation(channel, gif) {
  var Response = UrlFetchApp.fetch(url + "/sendAnimation?chat_id=" + channel + "&animation=" + gif);
  Logger.log(Response.getContentText());
}

function doPost(e){
  try{
  var emojies = ['¯\\_(ツ)_/¯', '¯\\_( ´･ω･)_/¯', '★｡･:*¯\\_(ツ)_/¯*:･ﾟ★', '🤷', '¯\\_(˶′◡‵˶)_/¯', '¯\\_(シ)_/¯', '¯\\_(⊙︿⊙)_/¯', '┐(￣ヘ￣)┌', '¯\\_ಠ_ಠ_/¯', '¯\\_༼ᴼل͜ᴼ༽_/¯']
  var contents = JSON.parse(e.postData.contents);
  //GmailApp.sendEmail("Daretens@gmail.com", "Telegram Bot Update", JSON.stringify(e.postData.contents,null,4));
  if (contents.message != null){
    var cont = contents.message;
  }else{
    var cont = contents.channel_post;
  }
  var text = cont.text;
  if (text[0] == "T"){
    var id = cont.chat.id;
    var txtar = text.split(" ");
    var castle = text.split("");
    var castlename = castle[4] + castle[5];
    if (cont.forward_from.username == ""){
      if (cont.chat.username == ""){
        var sheetName = "Sergeich 2";
      }else if(cont.author_signature != "Starlight" || cont.author_signature.includes('Andrei') || cont.author_signature == "Dr. \"E\"n"){
        var sheetName = "Andrei";
      }else if (id == "300420968" || id == "683475822" || id == myId){
        var sheetName = "Andrei";
      }
      else {
        var app = true;
      }
    }else if (cont.forward_from.username == ""){
      var sheetName = "Dir QC4";
    }
    var sheet = SpreadsheetApp.openById(ssId);
    var i = 2
    while (txtar[i] != "has" && txtar[i + 1] != "ordered"){
      i = i + 1;
    }
    i = i + 2;
    var manname = [];
    var j = 1;
    while(j < (i - 2)){
      manname.push(txtar[j]);
      j = j + 1;
    }
    var manname = manname.join(" ");
    var maintext = [manname, txtar[i], "0"];                                  
    //var Den = new Date().getHours();
    var Den = cont.forward_date;
    Den = Math.floor(Den / 3600);
    Den = Den + 3;
    Den = Den % 24;
    maintext[3] = "STORMY"
    if (cont.forward_from.username == ""){ 
      if((Den == "1") || (Den == "2") || (Den == "9") || (Den == "10") || (Den == "17") || (Den == "18")){
        maintext[3] = "Утро";
      }else if((Den == "3") || (Den == "4") || (Den == "11") || (Den == "12") || (Den == "19") || (Den == "20")){
        maintext[3] = "День";
      }else if((Den == "5") || (Den == "6") || (Den == "13") || (Den == "14") || (Den == "21") || (Den == "22")){
        maintext[3] = "Вечер";
      }else if((Den == "7") || (Den == "8") || (Den == "15") || (Den == "16") || (Den == "23") || (Den == "0")){
        maintext[3] = "Ночь";
      }
    }else if (cont.forward_from.username == ""){
      if((Den == "2") || (Den == "3") || (Den == "10") || (Den == "11") || (Den == "18") || (Den == "19")){
        maintext[3] = "Morning";
      }else if((Den == "4") || (Den == "5") || (Den == "12") || (Den == "13") || (Den == "20") || (Den == "21")){
        maintext[3] = "Day";
      }else if((Den == "6") || (Den == "7") || (Den == "14") || (Den == "15") || (Den == "22") || (Den == "23")){
        maintext[3] = "Evening";
      }else if((Den == "8") || (Den == "9") || (Den == "16") || (Den == "17") || (Den == "0") || (Den == "1")){
        maintext[3] = "Night";
      }
    }
    if((txtar[i + 3] == "1💰.") || (txtar[i + 3] == "40💰.") || (txtar[i + 3] == "100💰.") || (txtar[i + 3] == "20💰.") || (txtar[i + 3] == "10💰.") || (txtar[i + 3] == "25💰.") || (txtar[i + 3] == "5💰.") || (txtar[i + 3] == "50💰.") || (txtar[i + 3] == "2💰.")){
      maintext[2] = 0;
    }else{
      maintext[2] = null;
    }
    var ordername1 = maintext[0];
    var ordername = ordername1.slice(2);
    var array = [maintext[3], null, maintext[2], maintext[1], null, ordername, castlename];
    //sendText(myId, text);
    //sheet.getSheetByName(sheetName).appendRow([maintext[3], null, maintext[2], maintext[1], null, ordername, castlename]);
    if(!app){
      sheet.getSheetByName(sheetName).appendRow(array);
    }
    //sendText("", "Я про тебя сообщил и добавил вот это куда надо:\n" + text);
    if (cont.forward_from.username == "" && cont.chat.username == ""){
      forwardText('@', id, cont.message_id);
    }else if (cont.forward_from.username == "" && cont.chat.username == ""){
      forwardText('@', id, cont.message_id);
    }
  }
  } catch(e){
      sendText(myId, JSON.stringify(e,null,4));
  }
}

