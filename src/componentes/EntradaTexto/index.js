import { useState } from 'react';
import { TextInput, HelperText } from 'react-native-paper';
import estilos from './estilos';

export function EntradaTexto(props) {
  const { label, value, onChangeText, secureTextEntry, error, messageError } = props;
  const [secureMode, setSecureMode] = useState(secureTextEntry);
  // const showError = !value || error;
  const showError = error;

  return (
    <>
      <TextInput
        label={label}
        value={value}
        error={showError}
        secureTextEntry={secureMode}
        onChangeText={onChangeText}
        style={estilos.input}
        mode="outlined"
        activeOutlineColor='#1E8187'
        right={
          secureTextEntry ?
          <TextInput.Icon
            name={secureMode ? 'eye-off' : 'eye'}
            onPress={() => setSecureMode(!secureMode)}
          /> : null
        }
      />
      {showError && <HelperText type="error" visible={showError}>
        {messageError}
      </HelperText>}
    </>
  );
}
