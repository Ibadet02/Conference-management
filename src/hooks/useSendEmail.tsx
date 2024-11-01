import emailjs from "emailjs-com";

const useSendEmail = async (email, subject, message)=> {
 
    const emailParams = {
        send_to: email,
        subject,
        message,
      };

      try {
        await emailjs.send(
          "service_ygg253c",
          "template_hkix42q",
          emailParams,
          "tk4vUkqvvM6lt7KjL"
        );
        console.log("Email Sent");
      } catch (error) {
        console.error("Error sending email", error);
      }

};

export default useSendEmail;
