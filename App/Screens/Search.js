import { View } from 'react-native'
import React from 'react'
import SearchBar from '../Components/Search/SearchBar'
import global from './../Shared/style/style';

export default function Search() {
  return (
    <View style={global.container}>
      <SearchBar />
    </View>
  )
}