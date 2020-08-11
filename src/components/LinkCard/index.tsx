import React from 'react';

import {
  LinkItem,
  LinkItemHeader,
  LinkItemContent,
  LinkItemLinkText,
  LinkItemTime,
} from './styles';
import { BarCodeScannedWithDataFormatted } from '../../models/BarCodeScannedWithDataFormatted';

interface LinkCardProps {
  data: BarCodeScannedWithDataFormatted;
  onPress?: (data: BarCodeScannedWithDataFormatted) => void;
  onOptionsPress?: (data: BarCodeScannedWithDataFormatted) => void;
}

const LinkCard: React.FC<LinkCardProps> = ({
  data,
  onPress = () => {},
  onOptionsPress = () => {},
}) => {
  return (
    <LinkItem>
      {data.header && <LinkItemHeader>{data.header}</LinkItemHeader>}
      <LinkItemContent onPress={() => onPress(data)}>
        <LinkItemLinkText lineBreakMode="tail" numberOfLines={4}>
          {data.data}
        </LinkItemLinkText>
        <LinkItemTime>{data.timeFormatted}</LinkItemTime>
      </LinkItemContent>
    </LinkItem>
  );
};

export default LinkCard;
