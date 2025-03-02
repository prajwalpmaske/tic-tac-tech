import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const loadLocalizedData = async () => {
  try {
    const language = await AsyncStorage.getItem("language");
    console.log(language);
    switch (language) {
      case "Hindi":
        return require("../assets/languages/hindi.json");
      case "Marathi":
        return require("../assets/languages/marathi.json");
      case "English":
        return require("../assets/languages/english.json");
      default:
        return require("../assets/languages/english.json"); // default to English if undefined
    }
  } catch (error) {
    console.error("Failed to load the language file", error);
    return require("../assets/languages/english.json"); // default to English on error
  }
};

const PaymentOptions = () => {
  const [jsonData, setJsonData] = useState({
    hin:{
      AddImage: "छवि जोड़ें",
        Camera: "कैमरा",
        Gallery: "गैलरी",
        Cancel: "रद्द करें",
        Next: "अगला",
        PleaseAddImage: "कृपया आगे बढ़ने से पहले एक छवि जोड़ें",
        CameraPermission: "क्षमा करें, हमें कैमरा अनुमतियों की आवश्यकता है",
        MediaLibraryPermission: "क्षमा करें, हमें मीडिया लाइब्रेरी अनुमतियों की आवश्यकता है",
        AddCardDetails: "कार्ड विवरण जोड़ें",
        CardNumber: "कार्ड नंबर",
        CardholderName: "कार्डधारक का नाम",
        ExpirationDate: "समाप्ति की तारीख",
        CVV: "सीवीवी",
        CreditLimit: "क्रेडिट लिमिट",
        Balance: "शेष राशि",
        Status: "स्थिति",
        IssuedAt: "जारी किया गया",
        BillingAddress: "बिलिंग पता",
        RewardPoints: "इनाम अंक",
        InterestRate: "ब्याज दर",
        AddCard: "कार्ड जोड़ें",
        CardHolder: "कार्ड धारक",
        ValidThru: "वैध तक",
        CreditCardApplication: "क्रेडिट कार्ड आवेदन",
        FullName: "पूरा नाम",
        DateOfBirth: "जन्म तिथि",
        Address: "पता",
        AnnualIncome: "वार्षिक आय",
        EmploymentStatus: "रोजगार स्थिति",
        BankName: "बैंक का नाम",
        ExistingCreditCardNumber: "मौजूदा क्रेडिट कार्ड नंबर (यदि कोई हो)",
        PreferredCreditLimit: "प्राथमिकता क्रेडिट लिमिट",
        Investments: "निवेश",
        crypto: "क्रिप्टो",
        stocks: "शेयर",
        bonds: "बॉन्ड्स",
        properties: "सम्पत्तियाँ",
        CardDetails: "कार्ड विवरण",
        Close: "बंद करें",
        LoanApplication: "ऋण आवेदन",
        FixedDeposit: "सावधि जमा",
        AddImageComp: "छवि जोड़ें",
        CreditCardApplicationForm: "क्रेडिट कार्ड आवेदन",
        Notification: "सूचना क्लिक की",
        Profile: "प्रोफ़ाइल क्लिक की",
        Logo: "लोगो",
        QRCode: "क्यूआर कोड",
        account_id: "खाता आईडी",
        bitcoin: "बिटकॉइन",
        linechart: "लाइन चार्ट",
        LoanAmount: "ऋण राशि",
        LoanTenure: "ऋण अवधि (वर्षों में)",
        PurposeOfLoan: "ऋण का उद्देश्य",
        Home: "घर",
        Chatbot: "चैटबॉट",
        QRCode: "क्यूआर कोड",
        Card: "कार्ड",
        Profile: "प्रोफ़ाइल",
        homePressed: "होम दबाया गया",
        chatbotPressed: "चैटबॉट दबाया गया",
        qrscanPressed: "क्यूआर स्कैन दबाया गया",
        cardPressed: "कार्ड दबाया गया",
        profilePressed: "प्रोफ़ाइल दबाया गया",
        EnterPassword: "पासवर्ड दर्ज करें",
        Password: "पासवर्ड",
        Submit: "जमा करें",
        MakePayment: "भुगतान करें",
        QR: "क्यूआर",
        Account: "खाता",
        UPI: "यूपीआई",
        Cards: "कार्ड",
        PayViaQR: "क्यूआर द्वारा भुगतान करें",
        PayViaAccount: "खाते द्वारा भुगतान करें",
        PayViaUPI: "यूपीआई द्वारा भुगतान करें",
        PayViaCards: "कार्ड द्वारा भुगतान करें",
        PickAnImageFromGallery: "गैलरी से छवि चुनें",
        TakeAPicture: "तस्वीर क्लिक करें",
        NoImage: "कोई छवि नहीं",
        UploadImage: "छवि अपलोड करें",
        CameraPermissionRequired: "कैमरा अनुमतियाँ आवश्यक हैं",
        UploadSuccessful: "अपलोड सफल रहा",
        UploadFailed: "अपलोड असफल रहा",
        Close: "बंद करें",
        Person: "व्यक्ति",
        Amount: "राशि",
        DateTime: "तारीख और समय",
        AccountNumber: "खाता संख्या",
        AvailableBalance: "उपलब्ध शेष राशि",
        ViewTransactions: "लेनदेन देखें",
        Balance: "शेष राशि",
        NoImageSelected: "कोई छवि चयनित नहीं",
        Apply: "आवेदन करें",
        Documents: "दस्तावेज़",
        Email: "ईमेल",
        Login: "लॉग इन करें",
        LoginFailed: "लॉगिन विफल",
        Failure: "असफल",
        LoginSuccess: "लॉगिन सफल",
        EnterAccountNumber: "खाता संख्या दर्ज करें",
        EnterAmount: "राशि दर्ज करें",
        Pay: "भुगतान करें",
        AmountTransferred: "राशि सफलतापूर्वक स्थानांतरित!",
        ReceiverDetails: "प्राप्तकर्ता का विवरण",
        Username: "उपयोगकर्ता नाम",
        UPIID: "यूपीआई आईडी",
        NoAccessToCameraOrGallery: "कैमरा या गैलरी तक पहुंच नहीं",
        Capture: "कैप्चर करें",
        FromGalleryOptions: "गैलरी विकल्पों से",
        OpenCamera: "कैमरा खोलें",
        PermissionError: "अनुमति त्रुटि",
        GalleryError: "गैलरी त्रुटि",
        CameraError: "कैमरा त्रुटि",
        FailedToGetPermissions: "अनुमतियाँ प्राप्त करने में विफल",
        FailedToOpenGallery: "गैलरी खोलने में विफल",
        FailedToCapturePhoto: "फोटो कैप्चर करने में विफल",
        Back: "वापस",
        RecentTransactions: "हाल के लेनदेन",
        NoTransactions: "कोई लेनदेन नहीं"
    }
  });

  useEffect(() => {
    loadLocalizedData().then((data) => {
      setJsonData(data);
    });
  }, []);
  




  const navigation = useNavigation();

  const navigateToPayAcc = () => {
    navigation.navigate('pay_acc');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{jsonData.hin.MakePayment}</Text>
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.option} onPress={navigateToPayAcc}>
          <LinearGradient
            colors={['#0f2027', '#203a43', '#2c5364']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <Icon name="user" size={20} color="#fff" />
            <Text style={styles.optionText}>{jsonData.hin.Account}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Scanner')}>
          <LinearGradient
            colors={['#0f2027', '#203a43', '#2c5364']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
          >
            <Icon name="qrcode" size={20} color="#fff" />
            <Text style={styles.optionText}>{jsonData.hin.QR}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f7f7f7',
    padding: 15,
    borderRadius: 30,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  option: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 25,
    overflow: 'hidden',
    width:75,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  optionText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default PaymentOptions;
