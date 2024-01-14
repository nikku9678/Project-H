const ChatMessage = require("../models/chat.model") 

class ChatBuffer {
   constructor() {
      this.buffer = [];
      this.flushInterval = 15 * 60 * 1000; // Flush every 15 minutes (adjust as needed)
      this.flushTimer = null;
   }

   addMessage(message) {
      this.buffer.push(message);

      if (!this.flushTimer) {
         this.flushTimer = setTimeout(() => {
            this.flushMessages();
         }, this.flushInterval);
      }
   }

   async flushMessages() {
      try {
         if (this.buffer.length > 0) {
            await ChatMessage.bulkCreate(this.buffer);
            this.buffer = [];
         }
      } catch (error) {
         console.error('Error flushing chat messages:', error);
      } finally {
         this.flushTimer = null;
      }
   }

   async printChatBuffer(){
      console.log("THIS.BUFFER ==> ",this.buffer);
      for(let i in this.buffer){
         console.log("BUFFER===> ", this.buffer[i].message, " ", this.buffer[i].timestamp);
      }
   }
}

module.exports = ChatBuffer;