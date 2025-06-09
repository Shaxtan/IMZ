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
          <Image
            source={require('./assets/imz-logo.png')}
            style={styles.logoImage}
          />
          <TouchableOpacity onPress={() => console.log('Menu pressed')}>
            <Text style={styles.menuIcon}>☰</Text>
          </TouchableOpacity>
        </View>

        {/* Form Container */}
        <View style={styles.formBox}>
          <Text style={styles.heading}>Alert Logs</Text>
          <Text style={styles.sectionTitle}>Select Filters</Text>

          {/* Date Pickers */}
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>From Date</Text>
              <Button
                // icon="calendar"
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
                // icon="calendar"
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

          {/* Menus */}
          <Text style={styles.label}>Select Account</Text>
          <Menu
            visible={showAccountMenu}
            onDismiss={() => setShowAccountMenu(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setShowAccountMenu(true)}
                style={styles.dropdown}
                labelStyle={styles.dropdownLabel}
              >
                {account || 'Choose Account ▼'}
              </Button>
            }
          >
            {accountOptions.map((option, index) => (
              <Menu.Item
                key={index}
                onPress={() => {
                  setAccount(option);
                  setShowAccountMenu(false);
                }}
                title={option}
              />
            ))}
          </Menu>

          <Text style={styles.label}>Select Vehicle</Text>
          <Menu
            visible={showVehicleMenu}
            onDismiss={() => setShowVehicleMenu(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setShowVehicleMenu(true)}
                style={styles.dropdown}
                labelStyle={styles.dropdownLabel}
              >
                {vehicle || 'Choose Vehicle ▼'}
              </Button>
            }
          >
            {vehicleOptions.map((option, index) => (
              <Menu.Item
                key={index}
                onPress={() => {
                  setVehicle(option);
                  setShowVehicleMenu(false);
                }}
                title={option}
              />
            ))}
          </Menu>

          <Text style={styles.label}>Select Alert Type</Text>
          <Menu
            visible={showAlertTypeMenu}
            onDismiss={() => setShowAlertTypeMenu(false)}
            anchor={
              <Button
                mode="outlined"
                onPress={() => setShowAlertTypeMenu(true)}
                style={styles.dropdown}
                labelStyle={styles.dropdownLabel}
              >
                {alertType || 'Choose Alert Type ▼'}
              </Button>
            }
          >
            {alertTypeOptions.map((option, index) => (
              <Menu.Item
                key={index}
                onPress={() => {
                  setAlertType(option);
                  setShowAlertTypeMenu(false);
                }}
                title={option}
              />
            ))}
          </Menu>

          {/* Submit */}
          <Button mode="contained" style={styles.submitButton} onPress={() => console.log('Filters applied')}>
            Apply Filters
          </Button>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8fafc',
    paddingBottom: 50,
  },
  headerBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoImage: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  menuIcon: {
    fontSize: 24,
    color: '#1e293b',
  },
  formBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: -25,
    marginLeft:-240,
    textAlign: 'center',
    
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 16,
    textAlign: 'center',
    marginLeft:250,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
  column: {
    flex: 1,
  },
  dateButton: {
    borderColor: '#cbd5e1',
  },
  buttonLabel: {
    color: '#1e293b',
  },
  dropdown: {
    borderColor: '#cbd5e1',
    marginBottom: 8,
  },
  dropdownLabel: {
    color: '#1e293b',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#3b82f6',
  },
});

export default AlertLogsScreen;
