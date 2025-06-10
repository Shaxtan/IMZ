import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {
  Button,
  Menu,
  Provider as PaperProvider,
} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
// import { Ionicons } from '@expo/vector-icons'; // Optional: for nicer icons
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


const AlertLogsPopup = ({ visible, onClose }) => {
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
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <PaperProvider>
        <View style={styles.overlay}>
          <View style={styles.popupContainer}>
            {/* Header Close Icon */}
            <View style={styles.closeWrapper}>
              <TouchableOpacity onPress={onClose}>
                {/* <Ionicons name="close" size={26} color="#334155" /> */}
                {/* <MaterialIcons name="cancel" size={24} /> */}
{/* <FontAwesome name="times" size={24} /> */}

              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
              <View style={styles.formBox}>
                <Text style={styles.heading}>Alert Logs</Text>
                <Text style={styles.sectionTitle}>Select Filters</Text>

                {/* From/To Date */}
                <View style={styles.row}>
                  <View style={styles.column}>
                    <Text style={styles.label}>From Date</Text>
                    <Button
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

                <Button
                  mode="contained"
                  style={styles.submitButton}
                  onPress={() => console.log('Filters applied')}
                  labelStyle={{ fontWeight: '600' }}
                >
                  Apply Filters
                </Button>
              </View>
            </ScrollView>
          </View>
        </View>
      </PaperProvider>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    // backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupContainer: {
    width: '92%',
    height: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 10,
    overflow: 'hidden',
  },
  scrollContent: {
    padding: 16,
  },
  closeWrapper: {
    alignItems: 'flex-end',
    padding: 12,
    paddingRight: 20,
  },
  formBox: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 6,
    marginLeft:-200,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#475569',
    marginBottom: 16,
    textAlign: 'center',
    marginRight:-200,
    marginTop:-25,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
    marginTop: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  column: {
    flex: 1,
  },
  dateButton: {
    borderColor: '#cbd5e1',
  },
  buttonLabel: {
    color: '#1e293b',
    fontSize: 14,
  },
  dropdown: {
    borderColor: '#cbd5e1',
    marginBottom: 10,
  },
  dropdownLabel: {
    color: '#1e293b',
    fontSize: 14,
  },
  submitButton: {
    marginTop: 24,
    backgroundColor: '#3b82f6',
    paddingVertical: 6,
    borderRadius: 8,
  },
});

export default AlertLogsPopup;
