import React, { useEffect, useState } from 'react';
import { Image, View, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import base58 from 'bs58';
import nacl from 'tweetnacl'; // tweetnacl paketini içe aktarın
import { ImageRequireSource } from 'react-native';
import 'react-native-get-random-values';

interface ImagePressProps {
  onPress: () => void;
  image: ImageRequireSource;
}

const NetworkSelectScreen: React.FC = () => {
  const [dappKeyPair, setDappKeyPair] = useState<nacl.BoxKeyPair | null>(null);

  useEffect(() => {
    const generateRandomKeyPair = () => {
      try {
        // tweetnacl kullanarak rastgele bir anahtar çifti oluşturun.
        const newKeyPair = nacl.box.keyPair();
        setDappKeyPair(newKeyPair);
      } catch (error) {
        console.error('Error generating random key pair:', error);
      }
    };
  
    generateRandomKeyPair();
  }, []);
  

  const handleConnectPhantom = async () => {
    if (dappKeyPair) {
      const params = new URLSearchParams({
        dapp_encryption_public_key: base58.encode(dappKeyPair.publicKey),
        cluster: 'mainnet-beta', // Testnet için
        app_url: 'https://phantom.app',
        redirect_link: 'myapp://onConnect', // Özel URL şemanızı buraya ekleyin
      });
  
      const connectUrl = `${'phantom://'}v1/connect?${params.toString()}`;
  
      try {
        await Linking.openURL(connectUrl);
      } catch (error) {
        console.error('Error connecting to Phantom:', error);
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {dappKeyPair && (
          <ImagePress
            image={require('../assets/solana.webp')}
            onPress={handleConnectPhantom}
          />
        )}
      </View>
    </View>
  );
};

const ImagePress: React.FC<ImagePressProps> = ({ onPress, image }) => (
  <TouchableOpacity onPress={onPress}>
    <Image source={image} style={styles.image} resizeMode="contain" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default NetworkSelectScreen;