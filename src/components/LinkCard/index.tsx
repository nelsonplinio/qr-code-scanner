import React from 'react';

import {
  LinkItem,
  LinkItemHeader,
  LinkItemContent,
  LinkItemLinkText,
  LinkItemTime,
  FavorityIcon,
} from './styles';
import { BarCodeScannedWithDataFormatted } from '../../models/BarCodeScannedWithDataFormatted';
import { useFavority } from '../../hooks/favorityLinks';

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
  const { isFavorited } = useFavority();

  return (
    <LinkItem>
      {data.header && <LinkItemHeader>{data.header}</LinkItemHeader>}
      <LinkItemContent onPress={() => onPress(data)}>
        <LinkItemLinkText lineBreakMode="tail" numberOfLines={4}>
          {data.data}
        </LinkItemLinkText>

        {isFavorited(data) && (
          <FavorityIcon size={24} name="cards-heart" color="#F95E5A" />
        )}

        <LinkItemTime>{data.timeFormatted}</LinkItemTime>
      </LinkItemContent>
    </LinkItem>
  );
};

export default LinkCard;
