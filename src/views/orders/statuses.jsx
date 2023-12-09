import Tag from '@/components/Tag/index'
import genSelectOption from '@/helpers/genSelectOption'
import i18n from '@/locales/i18n'
import websiteIcon from '@/assets/icons/website.svg'
import operatorIcon from '@/assets/icons/operator.svg'
import mobileIcon from '@/assets/icons/mobile.svg'
import aggregatorIcon from '@/assets/icons/aggregator.svg'
import telegramIcon from '@/assets/icons/telegram.png'
import cash from '@/assets/icons/cash.svg'
import payme from '@/assets/icons/payme_logo.svg'
import apelsin from '@/assets/icons/apelsin.svg'
import epay from '@/assets/icons/epay_icon.png'
import bank from '@/assets/icons/transfer.svg'
import { Icon } from '@iconify/react'

import {
  NewStatusId,
  OperatorAcceptedStatusId,
  VendorReadyStatusId,
  VendorAcceptedStatusId,
  CourierAcceptedStatusId,
  CourierPickedUpStatusId,
  DeliveredStatusId,
  FinishedStatusId,
  OperatorCancelledStatusId,
  VendorCancelledStatusId,
  CourierCancelledStatusId,
  ServerCancelledStatusId,
  FutureStatusId,
} from '@/constants/statuses'

export const statusTag = (id, t) => {
  switch (id) {
    case NewStatusId:
      return (
        <Tag color="primary" className="py-1">
          {t('new')}
        </Tag>
      )
    case FutureStatusId:
      return (
        <Tag color="primary" className="py-1">
          {t('pre_order')}
        </Tag>
      )
    case OperatorAcceptedStatusId:
      return (
        <Tag className="py-1" color="primary">
          {t('operator_accepted')}
        </Tag>
      )
    case VendorReadyStatusId:
      return (
        <Tag className="py-1" color="success">
          {t('branch_prepared')}
        </Tag>
      )
    case VendorAcceptedStatusId:
      return (
        <Tag className="py-1" color="primary">
          {t('branch_accepted')}
        </Tag>
      )
    case CourierAcceptedStatusId:
      return (
        <Tag className="py-1" color="primary">
          {t('courier_accepted')}
        </Tag>
      )
    case CourierPickedUpStatusId:
      return (
        <Tag color="primary" className="py-1">
          {t('courier_on_the_way')}
        </Tag>
      )
    case DeliveredStatusId:
      return (
        <Tag color="success" className="py-1">
          {t('delivered')}
        </Tag>
      )

    case FinishedStatusId:
      return (
        <Tag color="success" className="py-1">
          {t('finished')}
        </Tag>
      )
    case OperatorCancelledStatusId:
      return (
        <Tag color="error" className="py-1">
          {t('operator_declined')}
        </Tag>
      )
    case VendorCancelledStatusId:
      return (
        <Tag color="error" className="py-1">
          {t('branch_declined')}
        </Tag>
      )
    case CourierCancelledStatusId:
      return (
        <Tag color="error" className="py-1">
          {t('courier_declined')}
        </Tag>
      )
    case ServerCancelledStatusId:
      return (
        <Tag color="error" className="py-1">
          {t('server_cancelled')}
        </Tag>
      )
    default:
      return null
  }
}

export function deliveryIcon() {
  return <Icon icon="eva:car-outline" style={{ fontSize: '36px' }} />
}

export function getSourceIcon(source) {
  var map = {
    admin_panel: operatorIcon,
    'admin-panel': operatorIcon,
    bot: telegramIcon,
    telegram: telegramIcon,
    website: websiteIcon,
    aggregator: aggregatorIcon,
    android: mobileIcon,
    ios: mobileIcon,
    mobile: mobileIcon,
    app: mobileIcon,
  }

  return map[source]
}

export const paymentTypeIconMake = (type) => {
  switch (type) {
    case 'payme':
      return payme
    case 'apelsin':
      return apelsin
    case 'cash':
      return cash
    case 'epay':
      return epay
    case 'transfer':
      return bank
    default:
      return ''
  }
}

export const filterStatus = [
  { label: i18n.t('new'), value: '986a0d09-7b4d-4ca9-8567-aa1c6d770505' },
  {
    label: i18n.t('branch_accepted'),
    value: '1b6dc9a3-64aa-4f68-b54f-71ffe8164cd3',
  },
  {
    label: i18n.t('branch_prepared'),
    value: 'b0cb7c69-5e3d-47c7-9813-b0a7cc3d81fd',
  },
  {
    label: i18n.t('courier_accepted'),
    value: '8781af8e-f74d-4fb6-ae23-fd997f4a2ee0',
  },
  {
    label: i18n.t('courier_on_the_way'),
    value: '84be5a2f-3a92-4469-8283-220ca34a0de4',
  },
  {
    label: i18n.t('operator_declined'),
    value: 'b5d1aa93-bccd-40bb-ae29-ea5a85a2b1d1',
  },
  { label: i18n.t('finished'), value: 'e665273d-5415-4243-a329-aee410e39465' },
  {
    label: i18n.t('server_cancelled'),
    value: 'd39cb255-6cf5-4602-896d-9c559d40cbbe',
  },
]

export const payment_types = genSelectOption([
  'cash',
  'payme',
  'click',
  'apelsin',
  'transfer',
  'epay',
])

export const paymentImgs = {
  cash: cash,
  payme: payme,
  click: payme,
  uzum: apelsin,
  apelsin: apelsin,
  epay: epay,
  transfer: bank,
}
