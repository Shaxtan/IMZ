import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.headerBar}>
          <Image source={require('./assets/imz-logo.png')} style={styles.logoImage} />
          <TouchableOpacity onPress={() => console.log('Menu pressed')}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        </View>

        {/* Form Container */}
        <View style={styles.formBox}>
          <View style={styles.titleRow}>
            <Text style={styles.heading}>Alert Logs</Text>
            <Text style={styles.sectionTitle}>Select Filters</Text>
          </View>

          {/* Date Pickers */}
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>From Date</Text>
              <Button
                icon="calendar"
                mode="outlined"
                onPress={() => setShowFromDate(true)}
                style={styles.dateButton}
                labelStyle={styles.buttonLabel}
              >
                {fromDate.toDateString()}
              </Button>
              {showFromDate && (
                <DateTimePicker
                  value={fromDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(e, selectedDate) => {
                    setShowFromDate(false);
                    if (selectedDate) setFromDate(selectedDate);
                  }}
                />
              )}
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>To Date</Text>
              <Button
                icon="calendar"
                mode="outlined"
                onPress={() => setShowToDate(true)}
                style={styles.dateButton}
                labelStyle={styles.buttonLabel}
              >
                {toDate.toDateString()}
              </Button>
              {showToDate && (
                <DateTimePicker
                  value={toDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(e, selectedDate) => {
                    setShowToDate(false);
                    if (selectedDate) setToDate(selectedDate);
                  }}
                />
              )}
            </View>
          </View>

          {/* Dropdowns */}
          <Text style={styles.label}>Account</Text>
          <Menu
            visible={showAccountMenu}
            onDismiss={() => setShowAccountMenu(false)}
            anchor={
              <TextInput
                mode="outlined"
                value={account}
                label="Account"
                style={styles.input}
                onFocus={() => setShowAccountMenu(true)}
                right={<TextInput.Icon icon="menu-down" />}
              />
            }
          >
            {accountOptions.map((item) => (
              <Menu.Item
                key={item}
                title={item}
                onPress={() => {
                  setAccount(item);
                  setShowAccountMenu(false);
                }}
              />
            ))}
          </Menu>

          <Text style={styles.label}>Vehicle</Text>
          <Menu
            visible={showVehicleMenu}
            onDismiss={() => setShowVehicleMenu(false)}
            anchor={
              <TextInput
                mode="outlined"
                value={vehicle}
                label="Vehicle"
                style={styles.input}
                onFocus={() => setShowVehicleMenu(true)}
                right={<TextInput.Icon icon="menu-down" />}
              />
            }
          >
            {vehicleOptions.map((item) => (
              <Menu.Item
                key={item}
                title={item}
                onPress={() => {
                  setVehicle(item);
                  setShowVehicleMenu(false);
                }}
              />
            ))}
          </Menu>

          <Text style={styles.label}>Alert Type</Text>
          <Menu
            visible={showAlertTypeMenu}
            onDismiss={() => setShowAlertTypeMenu(false)}
            anchor={
              <TextInput
                mode="outlined"
                value={alertType}
                label="Alert Type"
                style={styles.input}
                onFocus={() => setShowAlertTypeMenu(true)}
                right={<TextInput.Icon icon="menu-down" />}
              />
            }
          >
            {alertTypeOptions.map((item) => (
              <Menu.Item
                key={item}
                title={item}
                onPress={() => {
                  setAlertType(item);
                  setShowAlertTypeMenu(false);
                }}
              />
            ))}
          </Menu>

          {/* Submit */}
          <Button
            mode="contained"
            style={styles.submitButton}
            onPress={() => {
              console.log({ account, vehicle, alertType, fromDate, toDate });
            }}
          >
            Submit
          </Button>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default AlertLogsScreen;

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    elevation: 3,
  },
  logoImage: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  menuIcon: {
    fontSize: 26,
    color: '#111827',
  },
  container: {
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  formBox: {
    marginTop:30,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e3a8a',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  column: {
    width: '48%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#4b5563',
  },
  dateButton: {
    borderColor: '#d1d5db',
  },
  buttonLabel: {
    color: '#1f2937',
  },
  input: {
    backgroundColor: '#f3f4f6',
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: '#2563eb',
    marginTop: 12,
    paddingVertical: 6,
  },
});
