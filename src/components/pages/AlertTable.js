import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AlertCard = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.card}>
      <View style={styles.accentStrip} />
      <View style={styles.cardContent}>
        <Text style={styles.label}>
          Account Name: <Text style={styles.value}>{data.accountName}</Text>
        </Text>
        <Text style={styles.label}>
          Vehicle No: <Text style={styles.value}>{data.vehicleNo}</Text>
        </Text>
        <Text style={styles.label}>
          Latitude: <Text style={styles.value}>{data.latitude}</Text>
        </Text>
        <Text style={styles.label}>
          Longitude: <Text style={styles.value}>{data.longitude}</Text>
        </Text>

        {expanded && (
          <View style={styles.extraInfo}>
            <Text style={styles.label}>
              Alert Time: <Text style={styles.value}>{data.alertTime}</Text>
            </Text>
            <Text style={styles.label}>
              Source: <Text style={styles.value}>{data.source}</Text>
            </Text>
            <Text style={styles.label}>
              Operate By: <Text style={styles.value}>{data.operateBy}</Text>
            </Text>
            <Text style={styles.label}>
              Message: <Text style={styles.value}>{data.message}</Text>
            </Text>
          </View>
        )}

        <TouchableOpacity
          onPress={() => setExpanded(!expanded)}
          style={styles.viewMoreBtn}
        >
          <Text style={styles.viewMoreText}>
            {expanded ? '▲ View Less' : '▼ View More'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function App() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const sampleData = Array.from({ length: 30 }, (_, index) => ({
    accountName: `Account ${index + 1}`,
    vehicleNo: `AB${index + 10}CD${3000 + index}`,
    alertTime: `2025-06-08 10:${index < 10 ? '0' + index : index} AM`,
    latitude: (28.70 + index * 0.01).toFixed(4),
    longitude: (77.10 + index * 0.01).toFixed(4),
    source: 'GPS',
    operateBy: 'System',
    message: 'Overspeeding detected',
  }));

  const totalPages = Math.ceil(sampleData.length / pageSize);
  const paginatedData = sampleData.slice((page - 1) * pageSize, page * pageSize);

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setPage(1); // Reset to first page
  };

  return (
    <SafeAreaView style={styles.fullScreen}>
      
      <ScrollView contentContainerStyle={styles.container}>
        {/* Top Row: Menu and Dropdown */}
       

        <Text style={styles.heading}>Alert Log</Text>
         <View style={styles.topBar}>
          <TouchableOpacity style={styles.exportBox}>
            <Text style={styles.exportText} > ☰ Export Table Data</Text>
          </TouchableOpacity>

          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Entries per page:</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={pageSize}
                onValueChange={handlePageSizeChange}
                mode="dropdown"
                style={styles.picker}
                itemStyle={styles.pickerItem}
              >
                <Picker.Item label="5" value={5} />
                <Picker.Item label="10" value={10} />
                <Picker.Item label="15" value={15} />
                <Picker.Item label="20" value={20} />
              </Picker>
            </View>
          </View>
        </View>

        {paginatedData.map((item, index) => (
          <AlertCard key={index} data={item} />
        ))}

        <View style={styles.pagination}>
          <TouchableOpacity
            onPress={handlePrev}
            disabled={page === 1}
            style={styles.pageButton}
          >
            <Text
              style={[
                styles.pageButtonText,
                page === 1 && styles.disabledText,
              ]}
            >
              ◀ Prev
            </Text>
          </TouchableOpacity>
          <Text style={styles.pageIndicator}>
            Page {page} of {totalPages}
          </Text>
          <TouchableOpacity
            onPress={handleNext}
            disabled={page === totalPages}
            style={styles.pageButton}
          >
            <Text
              style={[
                styles.pageButtonText,
                page === totalPages && styles.disabledText,
              ]}
            >
              Next ▶
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  container: {
    padding: 16,
    paddingBottom: 100,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  exportBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b82f6',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  exportText: {
    color: '#fff',
    fontWeight: '600',
    
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0f2fe',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  dropdownLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginRight: 6,
    color: '#1e293b',
  },
  pickerWrapper: {
    backgroundColor: '#fff',
    borderRadius: 6,
    overflow: 'hidden',
  },
  picker: {
    width: 80,
    height: 30,
  },
  pickerItem: {
    fontSize: 12,
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  accentStrip: {
    width: 6,
    backgroundColor: '#3b82f6',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 6,
  },
  value: {
    fontWeight: '400',
    color: '#475569',
  },
  extraInfo: {
    marginTop: 4,
    paddingTop: 6,
  },
  viewMoreBtn: {
    marginTop: 8,
    alignSelf: 'flex-start',
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  viewMoreText: {
    color: '#0284c7',
    fontSize: 13,
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    alignItems: 'center',
  },
  pageButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  pageButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3b82f6',
  },
  disabledText: {
    color: '#94a3b8',
  },
  pageIndicator: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
});
