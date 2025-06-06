import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, Platform } from 'react-native';
import {
  Button,
  TextInput,
  Menu,
  Provider as PaperProvider,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const AlertLogsScreen = () => {
  const [account, setAccount] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [alertType, setAlertType] = useState('');

  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showVehicleMenu, setShowVehicleMenu] = useState(false);
  const [showAlertTypeMenu, setShowAlertTypeMenu] = useState(false);

  const [showFromDate, setShowFromDate] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());

  const [showToDate, setShowToDate] = useState(false);
  const [toDate, setToDate] = useState(new Date());

  const accountOptions = ['Account A', 'Account B', 'Account C'];
  const vehicleOptions = ['Vehicle 1', 'Vehicle 2', 'Vehicle 3'];
  const alertTypeOptions = ['Speed Alert', 'Geofence Alert', 'Battery Alert'];

  return (
    <PaperProvider>
      <View style={styles.container}>
        {/* Logo */}
        <Image
          source={require('./assets/imz-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Heading */}
        <Text style={styles.heading}>Alert Logs</Text>

        {/* Styled Box Container */}
        <View style={styles.formBox}>
          {/* Date selectors in a row */}
          <View style={styles.dateRow}>
            <View style={styles.dateColumn}>
              <Text style={styles.label}>From Date</Text>
              <Button
                icon="calendar"
                mode="outlined"
                onPress={() => setShowFromDate(true)}
                style={styles.dateButton}
              >
                {fromDate.toDateString()}
              </Button>
              {showFromDate && (
                <DateTimePicker
                  value={fromDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedDate) => {
                    setShowFromDate(false);
                    if (selectedDate) setFromDate(selectedDate);
                  }}
                />
              )}
            </View>

            <View style={styles.dateColumn}>
              <Text style={styles.label}>To Date</Text>
              <Button
                icon="calendar"
                mode="outlined"
                onPress={() => setShowToDate(true)}
                style={styles.dateButton}
              >
                {toDate.toDateString()}
              </Button>
              {showToDate && (
                <DateTimePicker
                  value={toDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedDate) => {
                    setShowToDate(false);
                    if (selectedDate) setToDate(selectedDate);
                  }}
                />
              )}
            </View>
          </View>

          {/* Account Dropdown */}
          <Menu
            visible={showAccountMenu}
            onDismiss={() => setShowAccountMenu(false)}
            anchor={
              <TextInput
                label="Account"
                value={account}
                mode="outlined"
                style={styles.input}
                onFocus={() => setShowAccountMenu(true)}
                right={<TextInput.Icon icon="menu-down" />}
              />
            }
          >
            {accountOptions.map((acc) => (
              <Menu.Item
                key={acc}
                onPress={() => {
                  setAccount(acc);
                  setShowAccountMenu(false);
                }}
                title={acc}
              />
            ))}
          </Menu>

          {/* Vehicle Dropdown */}
          <Menu
            visible={showVehicleMenu}
            onDismiss={() => setShowVehicleMenu(false)}
            anchor={
              <TextInput
                label="Vehicle"
                value={vehicle}
                mode="outlined"
                style={styles.input}
                onFocus={() => setShowVehicleMenu(true)}
                right={<TextInput.Icon icon="menu-down" />}
              />
            }
          >
            {vehicleOptions.map((veh) => (
              <Menu.Item
                key={veh}
                onPress={() => {
                  setVehicle(veh);
                  setShowVehicleMenu(false);
                }}
                title={veh}
              />
            ))}
          </Menu>

          {/* Alert Type Dropdown */}
          <Menu
            visible={showAlertTypeMenu}
            onDismiss={() => setShowAlertTypeMenu(false)}
            anchor={
              <TextInput
                label="Alert Type"
                value={alertType}
                mode="outlined"
                style={styles.input}
                onFocus={() => setShowAlertTypeMenu(true)}
                right={<TextInput.Icon icon="menu-down" />}
              />
            }
          >
            {alertTypeOptions.map((type) => (
              <Menu.Item
                key={type}
                onPress={() => {
                  setAlertType(type);
                  setShowAlertTypeMenu(false);
                }}
                title={type}
              />
            ))}
          </Menu>

          {/* Submit Button */}
          <Button
            mode="contained"
            style={styles.submitButton}
            onPress={() => {
              console.log({
                account,
                vehicle,
                alertType,
                fromDate,
                toDate,
              });
            }}
          >
            Submit
          </Button>
        </View>
      </View>
    </PaperProvider>
  );
};

export default AlertLogsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f1f8ff',
  },
  logo: {
    width: '60%',
    height: 60,
    alignSelf: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007bff',
    textAlign: 'center',
    marginBottom: 16,
  },
  formBox: {
    backgroundColor: '#e6f0ff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  dateColumn: {
    flex: 0.48,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e3a8a',
    marginBottom: 4,
  },
  dateButton: {
    justifyContent: 'center',
  },
  input: {
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  submitButton: {
    marginTop: 16,
    backgroundColor: '#007bff',
  },
});
