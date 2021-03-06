import styled from 'styled-components';
import yandexMoneyLogo from './assets/yandex.svg';
import qiwiLogo from './assets/qiwi.svg';
import {getKUBIcon} from "./icons/iconsGenerator";
import Card from "../Card";
import {commonColors} from '../../styles/index'
import {getContrastColorByBackground, media} from "../../modules/helpers";

const SelectedWrapper = styled.div`
    width: 100%;
`;

const Selected = styled.div`
    margin-top: 13px;
    height: 4px;
    width: ${(props) => props.width || '100'}%;
    ${(props) => props.transform ? `transform: ${props.transform};` : ''}
    background-color: ${(props) => props.theme.primaryColor || '#ff8c00'};
    border-radius: 2px 2px 0 0;
    box-sizing: border-box;
    transition: all 300ms;
`;

const Container = styled.div`
    padding: 36px 40px 0 40px;
    display: flex;
    flex-wrap: wrap;
    
    ${media.mobile} {
        padding: 20px 20px 0 20px;
    }
`;

const Divider = styled.hr`
    border: none;
    border-bottom: 1px solid #cccccc;
    opacity: 0.35;
    margin: 0;
`;

const PaymentCard = styled(Card)`
    z-index: 1;
    
    @media ${media.mobile} {
        width: 100%;
        max-width: 820px;
        border-radius: 0;
    }
`;

const PaymentBody = styled(Card.Body)`
    position: relative;
    max-width: 100%;
    
    @media ${media.mobile} {
        max-width: 100%;
        min-height: 270px;
        align-items: unset;
        box-sizing: border-box;
        padding: 20px;
    }
`;

export const MobileCardHeader = styled(Card.Header)`
    ${(props) => props.theme.secondaryColor ? `background-color: ${props.theme.secondaryColor};`: ''}
    padding: 12px 20px;
    border: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    height: 60px;
    box-sizing: border-box;
    color: ${(props) => props.theme.secondaryColor ? getContrastColorByBackground(props.theme.secondaryColor): commonColors.BLACK};
`;

export const MobileCardDescription = styled(Card.Desc)`
    color: #000;
    margin: 10px 20px;
`;

const Item = styled.div`
    display: inline-block;
    text-align: center;
    cursor: pointer;
    flex-grow: 1;
    flex-basis: 0;
    color: #666666;
    &:hover {
        color: #333333;
    }
    &:not(:first-child) {
        margin-left: 5px;
    }
    ${media.mobile} {
        textAlign: left;
    }
`;

const ItemActive = styled(Item)`
    color: #000000;
`;

const IconWrapper = styled.div`
    margin-bottom: 10px;
    
    ${media.mobile} {
        display: inline-block;
        margin-right: 11px;
        vertical-align: middle;
        padding-top: 5px;
    }
`;

const DefaultStyledIcon = styled.span`
    display: inline-block;
    background-position: center;
    vertical-align: middle;
    width: 37px;
    height: 37px;
`;

const IconInvoicing = styled(DefaultStyledIcon)`
    background: url(${qiwiLogo}) no-repeat;
`;

const IconInvoicingSelected = IconInvoicing;

const IconKub = styled(DefaultStyledIcon)`
    background: url("data:image/svg+xml,${getKUBIcon()}") no-repeat;
    width: 44px;
    height: 44px;
    
    ${media.mobile} {
        width: 33px;
        height: 24px;
    }
`;

const IconKubSelected = styled(IconKub)`
    background: url("data:image/svg+xml,${(props) => getKUBIcon(props.theme.primaryColor)}") no-repeat;
`;

const IconYandex = styled(DefaultStyledIcon)`
    background: url(${yandexMoneyLogo}) no-repeat;
    width: 42px;
    height: 41px;
    background-size: contain;
`;

const IconYandexSelected = IconYandex;

const Label = styled.div`
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    ${media.mobile} {
        display: inline-block
        font-size: 13px;
        vertical-align: middle;
    }
`;

export {
    Container,
    PaymentCard,
    PaymentBody,
    Divider,
    Item,
    ItemActive,
    IconWrapper,
    DefaultStyledIcon,
    SelectedWrapper,
    Label,
    Selected
}

export const IconComponents = {
    IconInvoicing,
    IconInvoicingSelected,
    IconYandex,
    IconYandexSelected,
    IconKub,
    IconKubSelected
}