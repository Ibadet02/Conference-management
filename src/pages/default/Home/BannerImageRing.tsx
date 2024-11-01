import { StyledBannerImageRing } from "../../../styles/pages/default/Home/BannerImageRing.styled";
import { BannerImageType } from "../../../types/default/types";
const BannerImageRing: React.FC<{ bannerImageRingData: BannerImageType }> = ({ bannerImageRingData }) => {
    return (
        <StyledBannerImageRing 
        $bannerimgsize={bannerImageRingData.size}
        $bannerimgpadding={bannerImageRingData.padding}>
            <div className="banner-ring--inner-border">
                <img src={bannerImageRingData.img} alt="banner-image" />
            </div>
        </StyledBannerImageRing>
    )
}

export default BannerImageRing;