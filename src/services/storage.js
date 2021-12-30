import EncryptedStorage from 'react-native-encrypted-storage';

export default class StorageService{
  static  async  storeUserSession(token )  {
      console.log("will store " + token)
        try {
            await EncryptedStorage.setItem(
                "user_session",
                token
            );
    
          
        } catch (error) {
            console.log("error  store " + token)
            console.log(error)
        }
    }

    static async  retrieveUserSession() {
        try {   
            const session = await EncryptedStorage.getItem("user_session");
           
            if (session !== undefined) {
                return session;
            }
            return ""
        } catch (error) {
            return ""
            // There was an error on the native side
        }
    }

    static async  removeUserSession() {
        try {
            await EncryptedStorage.removeItem("user_session");
            console.log('aba3na session ');
            await console.log(StorageService.retrieveUserSession());
            
            // Congrats! You've just removed your first value!
        } catch (error) {
            console.log(error)
        }
    }
}