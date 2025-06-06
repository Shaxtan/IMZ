import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';

const PAGE_SIZE = 20;

const getLockImage = (lockStatus) => {
  switch (lockStatus.toLowerCase()) {
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

const data = [...Array(60).keys()].map((i) => ({
  id: `${i}`,
  status: i % 2 === 0 ? 'Active' : 'Inactive',
  unlock: i % 3 === 0 ? 'Yes' : 'No',
  // Rotating lock statuses
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

const TableRow = ({ item, isExpanded, onToggle }) => (
  <View style={styles.rowContainer}>
    <View style={styles.mainRow}>
      <View style={styles.cell}>
        <Image
          source={
            item.status === 'Active'
              ? require('./assets/on.png')
              : require('./assets/off.png')
          }
          style={styles.statusIcon}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.cell}>{item.unlock}</Text>
      <View style={styles.cell}>
        <Image
          source={getLockImage(item.lockStatus)}
          style={styles.lockIcon}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.cell}>{item.iotPadlockName}</Text>
      <TouchableOpacity onPress={onToggle}>
        <Text style={[styles.cell, styles.toggleText]}>
          {isExpanded ? 'Hide' : 'Show More'}
        </Text>
      </TouchableOpacity>
    </View>

    {isExpanded && (
      <View style={styles.expandedContent}>
        <Text style={styles.expandedText}>Account Name: {item.accountName}</Text>
        <Text style={styles.expandedText}>Device Type: {item.deviceType}</Text>
        <Text style={styles.expandedText}>Battery: {item.battery}</Text>
        <Text style={styles.expandedText}>Speed: {item.speed}</Text>
        <Text style={styles.expandedText}>Date & Time: {item.dateTime}</Text>
        <Text style={styles.expandedText}>Address: {item.address}</Text>
        <Text style={styles.expandedText}>GPS Status: {item.gpsStatus}</Text>
      </View>
    )}
  </View>
);

const CollapsibleTable = () => {
  const [expandedRows, setExpandedRows] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const paginatedData = data.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const toggleExpand = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderItem = ({ item }) => (
    <TableRow
      item={item}
      isExpanded={!!expandedRows[item.id]}
      onToggle={() => toggleExpand(item.id)}
    />
  );

  const renderPagination = () => (
    <View style={styles.paginationContainer}>
      {Array.from({ length: totalPages }, (_, i) => (
        <TouchableOpacity
          key={i + 1}
          onPress={() => setCurrentPage(i + 1)}
          style={styles.pageButton}
        >
          <Text style={styles.pageText}>{i + 1}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.header, styles.bold]}>Status</Text>
        <Text style={[styles.header, styles.bold]}>Unlock</Text>
        <Text style={[styles.header, styles.bold]}>Lock</Text>
        <Text style={[styles.header, styles.bold]}>Padlock</Text>
        <Text style={[styles.header, styles.bold]}>Actions</Text>
      </View>
      <FlatList
        data={paginatedData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 60 }}
      />
      {renderPagination()}
    </View>
  );
};

export default CollapsibleTable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#1f2937',
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 10,
  },
  header: {
    color: 'white',
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
  },
  rowContainer: {
    marginBottom: 10,
    backgroundColor: '#f7f9fc',
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  mainRow: {
    flexDirection: 'row',
    padding: 10,
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  toggleText: {
    color: '#2563eb',
    fontWeight: '600',
    textAlign: 'center',
  },
  expandedContent: {
    backgroundColor: '#e5e7eb',
    padding: 10,
  },
  expandedText: {
    fontSize: 13,
    marginBottom: 4,
    color: '#374151',
  },
  bold: {
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  pageButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  pageText: {
    fontSize: 13,
    color: '#333',
  },
  statusIcon: {
    width: 20,
    height: 20,
  },
  lockIcon: {
    width: 24,
    height: 24,
  },
});
