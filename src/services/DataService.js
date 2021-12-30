
export default class StorageService{
    static  async  storeUserSession(token )  {
          try {
              await EncryptedStorage.setItem(
                  "user_session",
                  token
              );
      
            
          } catch (error) {
              console.log(error)
          }
      }
  
      
  }