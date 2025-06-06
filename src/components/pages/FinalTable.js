import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ActionCard = ({ accountName, vehicleNumber, tripId, imei }) => {
  const [showActions, setShowActions] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const toggleActions = () => setShowActions(!showActions);
  const toggleExpanded = () => setExpanded(!expanded);

  const actionIcons = [
    { name: 'One', icon: require('./assets/one.png') },
    { name: 'Three', icon: require('./assets/three.png') },
    { name: 'Four', icon: require('./assets/four.png') },
    { name: 'Five', icon: require('./assets/five.png') },
    { name: 'Six', icon: require('./assets/six.png') },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>{accountName}</Text>
          <Text style={styles.subText}>Vehicle No.: {vehicleNumber}</Text>
          <Text style={styles.subText}>Trip ID: {tripId}</Text>
          <Text style={styles.subText}>IMEI: {imei}</Text>
        </View>
        <View style={styles.unlockContainer}>
          <Image source={require('./assets/two.png')} style={styles.unlockIcon} />
          <Text style={styles.unlockText}>Unlock</Text>
        </View>
      </View>

      {expanded && (
        <View style={styles.expandedSectionInline}>
          <Text style={styles.info}>Driver: John Doe</Text>
          <Text style={styles.info}>Route: Pune → Mumbai</Text>
          <Text style={styles.info}>ETA: 14:35</Text>
          <Text style={styles.info}>Load: Electronics</Text>
        </View>
      )}

      <TouchableOpacity onPress={toggleActions} style={styles.actionsBtn}>
        <Text style={styles.actionsText}>
          {showActions ? '▲ Hide Actions' : '▼ Actions'}
        </Text>
      </TouchableOpacity>

      {showActions && (
        <View style={styles.iconRow}>
          {actionIcons.map((action, index) => (
            <TouchableOpacity key={index} style={styles.iconButton}>
              <Image source={action.icon} style={styles.iconImage} />
            </TouchableOpacity>
          ))}
        </View>
      )}

      <TouchableOpacity onPress={toggleExpanded} style={styles.viewMoreBtn}>
        <Text style={styles.viewMoreText}>
          {expanded ? '▲ View Less' : '▼ View More'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const CardList = () => {
  const allData = [...Array(25).keys()].map((i) => ({
    id: i,
    accountName: `Account ${i + 1}`,
    vehicleNumber: `MH12AB${1000 + i}`,
    tripId: `TRIP${i + 1}`,
    imei: `IMEI${100000000000000 + i}`,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const totalPages = Math.ceil(allData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentData = allData.slice(startIndex, startIndex + pageSize);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handlePageSizeChange = (value) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  return (
    <View style={styles.fullScreen}>
      {/* Header with logo and menu */}
      <View style={styles.headerBar}>
        <Image source={require('./assets/imz-logo.png')} style={styles.logoImage} />
        <TouchableOpacity onPress={() => console.log('Menu pressed')}>
          <Text style={styles.menuIcon}>☰</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Active (On Going) Trip List</Text>

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

        {currentData.map((item) => (
          <ActionCard
            key={item.id}
            accountName={item.accountName}
            vehicleNumber={item.vehicleNumber}
            tripId={item.tripId}
            imei={item.imei}
          />
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={handlePrev}
          disabled={currentPage === 1}
          style={styles.pageButton}
        >
          <Text
            style={[
              styles.pageButtonText,
              currentPage === 1 && styles.disabledText,
            ]}
          >
            ← Prev
          </Text>
        </TouchableOpacity>

        <Text style={styles.pageIndicator}>
          Page {currentPage} of {totalPages}
        </Text>

        <TouchableOpacity
          onPress={handleNext}
          disabled={currentPage === totalPages}
          style={styles.pageButton}
        >
          <Text
            style={[
              styles.pageButtonText,
              currentPage === totalPages && styles.disabledText,
            ]}
          >
            Next →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardList;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
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
    color: '#1e293b',
    fontWeight: '700',
  },
  container: {
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flex: 1,
    paddingRight: 10,
  },
  unlockContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  unlockIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  unlockText: {
    fontSize: 12,
    color: '#334155',
    marginTop: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 4,
  },
  subText: {
    fontSize: 13,
    color: '#475569',
  },
  expandedSectionInline: {
    marginTop: 12,
  },
  info: {
    fontSize: 13,
    color: '#334155',
    marginBottom: 4,
  },
  iconRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
    marginBottom: 8,
  },
  iconButton: {
    backgroundColor: '#f3f4f6',
    padding: 10,
    borderRadius: 12,
    marginRight: 10,
    elevation: 2,
  },
  iconImage: {
    width: 28,
    height: 28,
  },
  actionsBtn: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  actionsText: {
    color: '#10b981',
    fontSize: 13,
    fontWeight: '600',
  },
  viewMoreBtn: {
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  viewMoreText: {
    color: '#3b82f6',
    fontSize: 13,
    fontWeight: '600',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#e2e8f0',
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
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginLeft: 180,
    paddingHorizontal: 8,
  },
  dropdownLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginRight: 10,
  },
  pickerWrapper: {
    width: 70,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    height: 40,
    color: '#1e293b',
  },
  pickerItem: {
    fontSize: 14,
    height: 40,
    color: '#1e293b',
  },
});
