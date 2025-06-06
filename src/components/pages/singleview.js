import React from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';

const data = [...Array(60).keys()].map((i) => ({
  id: `${i}`,
  status: i % 2 === 0 ? 'Active' : 'Inactive',
  unlock: i % 3 === 0 ? 'Yes' : 'No',
  lockStatus: ['Open', 'Closed', 'SemiOpen', 'SemiClosed'][i % 4],
  iotPadlockName: `Padlock-${i}`,
  accountName: `Account ${i}`,
  deviceType: 'GSM',
  battery: `${90 - i}%`,
  speed: `${i * 3} km/h`,
  dateTime: `2025-06-05 10:${i < 10 ? '0' + i : i}`,
  address: `Address ${i}`,
  gpsStatus: i % 2 === 0 ? 'Online' : 'Offline',
}));

const getLockImage = (status) => {
  switch (status.toLowerCase()) {
    case 'open':
      return require('./assets/open.png');
    case 'closed':
      return require('./assets/closed.png');
    case 'semiopen':
      return require('./assets/semiopen.png');
    case 'semiclosed':
      return require('./assets/semiclosed.png');
    default:
      return null;
  }
};

const TableHeader = () => (
  <View style={styles.headerRow}>
    <Text style={[styles.headerCell, { width: 40 }]}>Status</Text>
    <Text style={[styles.headerCell, { width: 60 }]}>Unlock</Text>
    <Text style={[styles.headerCell, { width: 40 }]}>Lock</Text>
    <Text style={[styles.headerCell, { width: 90 }]}>Padlock</Text>
    <Text style={[styles.headerCell, { width: 90 }]}>Account</Text>
    <Text style={[styles.headerCell, { width: 70 }]}>Device</Text>
    <Text style={[styles.headerCell, { width: 60 }]}>Battery</Text>
    <Text style={[styles.headerCell, { width: 70 }]}>Speed</Text>
    <Text style={[styles.headerCell, { width: 120 }]}>DateTime</Text>
    <Text style={[styles.headerCell, { width: 150 }]}>Address</Text>
    <Text style={[styles.headerCell, { width: 80 }]}>GPS</Text>
  </View>
);

const TableRow = ({ item }) => (
  <View style={styles.dataRow}>
    <View style={[styles.cell, { width: 40 }]}>
      <Image
        source={
          item.status === 'Active'
            ? require('./assets/on.png')
            : require('./assets/off.png')
        }
        style={styles.icon}
        resizeMode="contain"
      />
    </View>
    <Text style={[styles.cell, { width: 60 }]}>{item.unlock}</Text>
    <View style={[styles.cell, { width: 40 }]}>
      <Image
        source={getLockImage(item.lockStatus)}
        style={styles.icon}
        resizeMode="contain"
      />
    </View>
    <Text style={[styles.cell, { width: 90 }]}>{item.iotPadlockName}</Text>
    <Text style={[styles.cell, { width: 90 }]}>{item.accountName}</Text>
    <Text style={[styles.cell, { width: 70 }]}>{item.deviceType}</Text>
    <Text style={[styles.cell, { width: 60 }]}>{item.battery}</Text>
    <Text style={[styles.cell, { width: 70 }]}>{item.speed}</Text>
    <Text style={[styles.cell, { width: 120 }]}>{item.dateTime}</Text>
    <Text style={[styles.cell, { width: 150 }]}>{item.address}</Text>
    <Text style={[styles.cell, { width: 80 }]}>{item.gpsStatus}</Text>
  </View>
);

const CollapsibleTable = () => {
  return (
    <ScrollView horizontal>
      <View style={styles.container}>
        <TableHeader />
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TableRow item={item} />}
        />
      </View>
    </ScrollView>
  );
};

export default CollapsibleTable;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#1f2937',
    paddingVertical: 8,
    borderRadius: 4,
  },
  headerCell: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    backgroundColor: '#f9fafb',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 6,
  },
  cell: {
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: 4,
    fontSize: 12,
    color: '#111827',
  },
  icon: {
    width: 20,
    height: 20,
    alignSelf: 'center',
  },
});
