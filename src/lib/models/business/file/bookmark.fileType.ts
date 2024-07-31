import { BOOKMARK_VARIANT } from '@constants/bookmark/bookmark.variants';
import { FileDataDTO } from '@models/dto/file.dto';
import { Datapoint } from './datapoint/datapoint';
import { FileDetail } from './fileDetail';
import { FileType } from './fileType';
import { FileVariant } from './fileVariant';

export class BookmarkFileType implements FileType {
  variants: FileVariant[];
  datapoints: Datapoint[];

  constructor() {
    this.datapoints = [
      {
        id: 'url',
        name: 'URL',
        type: 'string',
        order: 1,
        placeholder: 'https://...',
        validations: [
          {
            type: 'min',
            value: 10,
          },
          {
            type: 'max',
            value: 100,
          },
          {
            type: 'regex',
            value: '',
            errorMessage: 'Invalid URL',
          },
        ],
      },
      {
        id: 'title',
        name: 'Title',
        type: 'string',
        order: 2,
        placeholder: 'My Bookmark',
        validations: [
          {
            type: 'min',
            value: 4,
          },
          {
            type: 'max',
            value: 30,
          },
        ],
      },
      {
        id: 'description',
        name: 'Description',
        type: 'string',
        order: 3,
        placeholder: 'A description',
        validations: [
          {
            type: 'max',
            value: 200,
          },
          {
            type: 'isOptional',
            value: true,
          },
        ],
      },
    ];
    this.variants = [BOOKMARK_VARIANT];
  }

  getKeyData(fileData: FileDataDTO): { primary: string; secondary: string } {
    return { primary: fileData.title, secondary: '' };
  }

  getDetailData(fileData: FileDataDTO): FileDetail {
    const entity = this.variants
      .find((variant) => variant.id === fileData.variant)
      ?.availableEntities.find((entity) => entity.id === fileData.entity);

    return {
      title: fileData.title,
      entity,
      qrInfo: fileData.url,
      link: fileData.url,
      extraDatapoints: [],
    };
  }
}
