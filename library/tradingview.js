"use strict";
(async () => {
    // mã chứng khoán
	const allKey=[{code:"TET",fullname_vi:"CTCP Vải sợi May mặc Miền Bắc",type:1,san:"HNX"},{code:"AAA",fullname_vi:"CTCP Nhựa An Phát Xanh",type:1,san:"HOSE"},{code:"AAH",fullname_vi:"CTCP Hợp Nhất",type:1,san:"UPCOM"},{code:"AAM",fullname_vi:"CTCP Thủy sản MeKong",type:1,san:"HOSE"},{code:"TYA",fullname_vi:"CTCP Dây và Cáp Điện Taya Việt Nam",type:1,san:"HOSE"},{code:"UCT",fullname_vi:"CTCP Đô thị Cần Thơ",type:1,san:"UPCOM"},{code:"UDC",fullname_vi:"CTCP Xây dựng và Phát triển Đô thị Tỉnh Bà Rịa Vũng Tàu",type:1,san:"UPCOM"},{code:"UDJ",fullname_vi:"CTCP Phát triển Đô thị",type:1,san:"UPCOM"},{code:"UDL",fullname_vi:"CTCP Đô thị và Môi trường Đắk Lắk",type:1,san:"UPCOM"},{code:"UEM",fullname_vi:"CTCP Cơ điện Uông Bí - Vinacomin",type:1,san:"UPCOM"},{code:"UIC",fullname_vi:"CTCP Đầu tư Phát triển Nhà và Đô thị IDICO",type:1,san:"HOSE"},{code:"UMC",fullname_vi:"CTCP Công trình Đô thị Nam Định",type:1,san:"UPCOM"},{code:"UNI",fullname_vi:"CTCP Đầu Tư Và Phát Triển Sao Mai Việt",type:1,san:"HNX"},{code:"UPC",fullname_vi:"CTCP Phát triển Công viên Cây xanh và Đô thị Vũng Tàu",type:1,san:"UPCOM"},{code:"UPH",fullname_vi:"CTCP Dược phẩm TW 25",type:1,san:"UPCOM"},{code:"USC",fullname_vi:"CTCP Khảo sát và Xây dựng -USCO",type:1,san:"UPCOM"},{code:"USD",fullname_vi:"CTCP Công trình Đô thị Sóc Trăng",type:1,san:"UPCOM"},{code:"V11",fullname_vi:"CTCP Xây dựng Số 11",type:1,san:"UPCOM"},{code:"V12",fullname_vi:"CTCP Xây dựng Số 12",type:1,san:"HNX"},{code:"V15",fullname_vi:"CTCP Xây dựng Số 15",type:1,san:"UPCOM"},{code:"V21",fullname_vi:"CTCP Vinaconex 21",type:1,san:"HNX"},{code:"VAF",fullname_vi:"CTCP Phân lân Nung chảy Văn Điển",type:1,san:"HOSE"},{code:"VAV",fullname_vi:"CTCP VIWACO",type:1,san:"UPCOM"},{code:"VBC",fullname_vi:"CTCP Nhựa - Bao bì Vinh",type:1,san:"HNX"},{code:"VBG",fullname_vi:"CTCP Địa chất Việt Bắc - TKV",type:1,san:"UPCOM"},{code:"VBH",fullname_vi:"CTCP Điện tử Bình Hòa",type:1,san:"UPCOM"},{code:"VC1",fullname_vi:"CTCP Xây dựng Số 1",type:1,san:"HNX"},{code:"VC2",fullname_vi:"CTCP Đầu tư và Xây dựng Vina2",type:1,san:"HNX"},{code:"VC3",fullname_vi:"CTCP Tập đoàn Nam Mê Kông",type:1,san:"HNX"},{code:"VC5",fullname_vi:"CTCP Xây dựng Số 5",type:1,san:"UPCOM"},{code:"VC6",fullname_vi:"CTCP Xây dựng và Đầu tư Visicons",type:1,san:"HNX"},{code:"VC7",fullname_vi:"CTCP Tập đoàn BGI",type:1,san:"HNX"},{code:"VC9",fullname_vi:"CTCP Xây dựng Số 9",type:1,san:"HNX"},{code:"VCA",fullname_vi:"CTCP Thép VICASA - VNSTEEL",type:1,san:"HOSE"},{code:"VCC",fullname_vi:"CTCP Vinaconex 25",type:1,san:"HNX"},{code:"VCE",fullname_vi:"CTCP Xây lắp Môi trường",type:1,san:"UPCOM"},{code:"VCF",fullname_vi:"CTCP Vinacafé Biên Hòa",type:1,san:"HOSE"},{code:"VCG",fullname_vi:"Tổng CTCP Xuất nhập khẩu và Xây dựng Việt Nam",type:1,san:"HOSE"},{code:"VCM",fullname_vi:"CTCP Nhân lực và Thương mại Vinaconex",type:1,san:"HNX"},{code:"VCP",fullname_vi:"CTCP Xây dựng và Năng Lượng VCP",type:1,san:"UPCOM"},{code:"VCR",fullname_vi:"CTCP Đầu tư và Phát triển Du lịch Vinaconex",type:1,san:"UPCOM"},{code:"VCS",fullname_vi:"CTCP Vicostone",type:1,san:"HNX"},{code:"VCT",fullname_vi:"CTCP Tư vấn Xây dựng Vinaconex",type:1,san:"UPCOM"},{code:"VCW",fullname_vi:"CTCP Đầu tư Nước sạch Sông Đà",type:1,san:"UPCOM"},{code:"VCX",fullname_vi:"CTCP Xi măng Yên Bình",type:1,san:"UPCOM"},{code:"VDB",fullname_vi:"CTCP Vận tải và Chế biến Than Đông Bắc",type:1,san:"UPCOM"},{code:"VDL",fullname_vi:"CTCP Thực phẩm Lâm Đồng",type:1,san:"HNX"},{code:"VDN",fullname_vi:"CTCP Vinatex Đà Nẵng",type:1,san:"UPCOM"},{code:"VDP",fullname_vi:"CTCP Dược phẩm Trung ương VIDIPHA",type:1,san:"HOSE"},{code:"VDT",fullname_vi:"CTCP Lưới thép Bình Tây",type:1,san:"UPCOM"},{code:"VE1",fullname_vi:"CTCP Xây dựng Điện VNECO 1",type:1,san:"HNX"},{code:"VE2",fullname_vi:"CTCP Xây dựng Điện VNECO 2",type:1,san:"UPCOM"},{code:"VE3",fullname_vi:"CTCP Xây dựng Điện VNECO 3",type:1,san:"HNX"},{code:"VE4",fullname_vi:"CTCP Xây dựng Điện VNECO4",type:1,san:"HNX"},{code:"VE8",fullname_vi:"CTCP Xây dựng Điện VNECO 8",type:1,san:"HNX"},{code:"VE9",fullname_vi:"CTCP Đầu tư và Xây dựng VNECO 9",type:1,san:"UPCOM"},{code:"VEA",fullname_vi:"Tổng Công ty Máy động lực và Máy nông nghiệp Việt Nam – CTCP",type:1,san:"UPCOM"},{code:"VEC",fullname_vi:"Tổng CTCP Điện tử và Tin học Việt Nam",type:1,san:"UPCOM"},{code:"VEF",fullname_vi:"CTCP Trung tâm Hội chợ Triển lãm Việt Nam",type:1,san:"UPCOM"},{code:"VES",fullname_vi:"CTCP Đầu tư và Xây dựng Điện Mêca Vneco",type:1,san:"UPCOM"},{code:"VET",fullname_vi:"CTCP Thuốc thú y Trung ương Navetco",type:1,san:"UPCOM"},{code:"VFC",fullname_vi:"CTCP Vinafco",type:1,san:"UPCOM"},{code:"VFG",fullname_vi:"CTCP Khử trùng Việt Nam",type:1,san:"HOSE"},{code:"VFR",fullname_vi:"CTCP Vận tải và Thuê tàu",type:1,san:"UPCOM"},{code:"VGC",fullname_vi:"Tổng Công ty Viglacera - CTCP",type:1,san:"HOSE"},{code:"VGG",fullname_vi:"Tổng CTCP May Việt Tiến",type:1,san:"UPCOM"},{code:"VGI",fullname_vi:"Tổng CTCP Đầu tư Quốc tế Viettel",type:1,san:"UPCOM"},{code:"VGL",fullname_vi:"CTCP Mạ Kẽm Công Nghiệp Vingal - Vnsteel",type:1,san:"UPCOM"},{code:"VGP",fullname_vi:"CTCP Cảng Rau Quả",type:1,san:"HNX"},{code:"VGR",fullname_vi:"CTCP Cảng Xanh Vip",type:1,san:"UPCOM"},{code:"VGS",fullname_vi:"CTCP Ống thép Việt Đức VG PIPE",type:1,san:"HNX"},{code:"VGT",fullname_vi:"Tập đoàn Dệt May Việt Nam",type:1,san:"UPCOM"},{code:"VGV",fullname_vi:"Tổng Công ty Tư vấn Xây dựng Việt Nam - CTCP",type:1,san:"UPCOM"},{code:"VHC",fullname_vi:"CTCP Vĩnh Hoàn",type:1,san:"HOSE"},{code:"VHD",fullname_vi:"CTCP Đầu tư Phát triển Nhà và Đô Thị VINAHUD",type:1,san:"UPCOM"},{code:"VHE",fullname_vi:"CTCP Dược liệu và Thực phẩm Việt Nam",type:1,san:"HNX"},{code:"VHF",fullname_vi:"CTCP Xây dựng và Chế biến Lương thực Vĩnh Hà",type:1,san:"UPCOM"},{code:"VHG",fullname_vi:"CTCP Đầu tư Phát triển Việt Trung Nam",type:1,san:"UPCOM"},{code:"VHH",fullname_vi:"CTCP Đầu tư Kinh doanh Nhà Thành Đạt",type:1,san:"UPCOM"},{code:"VHL",fullname_vi:"CTCP Viglacera Hạ Long",type:1,san:"HNX"},{code:"VHM",fullname_vi:"CTCP Vinhomes",type:1,san:"HOSE"},{code:"VIC",fullname_vi:"Tập đoàn VINGROUP - CTCP",type:1,san:"HOSE"},{code:"VID",fullname_vi:"CTCP Đầu tư Phát triển Thương mại Viễn Đông",type:1,san:"HOSE"},{code:"VIE",fullname_vi:"CTCP Công nghệ Viễn thông VITECO",type:1,san:"UPCOM"},{code:"VIF",fullname_vi:"Tổng Công ty Lâm nghiệp Việt Nam - CTCP",type:1,san:"HNX"},{code:"VIH",fullname_vi:"CTCP Viglacera Hà Nội",type:1,san:"UPCOM"},{code:"VIM",fullname_vi:"CTCP Khoáng sản Viglacera",type:1,san:"UPCOM"},{code:"VIN",fullname_vi:"CTCP Giao nhận Kho vận Ngoại Thương Việt Nam",type:1,san:"UPCOM"},{code:"VIP",fullname_vi:"CTCP Vận tải Xăng dầu Vipco",type:1,san:"HOSE"},{code:"VIR",fullname_vi:"CTCP Du lịch Quốc tế Vũng Tàu",type:1,san:"UPCOM"},{code:"VIT",fullname_vi:"CTCP Viglacera Tiên Sơn",type:1,san:"HNX"},{code:"VIW",fullname_vi:"Tổng Công ty Đầu tư Nước và Môi trường Việt Nam",type:1,san:"UPCOM"},{code:"VJC",fullname_vi:"CTCP Hàng không Vietjet",type:1,san:"HOSE"},{code:"VKC",fullname_vi:"CTCP VKC Holdings",type:1,san:"UPCOM"},{code:"VKP",fullname_vi:"CTCP Nhựa Tân Hóa",type:1,san:"UPCOM"},{code:"VLA",fullname_vi:"CTCP Đầu tư và Phát triển Công nghệ Văn Lang",type:1,san:"HNX"},{code:"VLB",fullname_vi:"CTCP Xây dựng và Sản xuất Vật liệu xây dựng Biên Hòa",type:1,san:"UPCOM"},{code:"VLC",fullname_vi:"Tổng Công ty Chăn Nuôi Việt Nam - CTCP",type:1,san:"UPCOM"},{code:"VLF",fullname_vi:"CTCP Lương thực Thực phẩm Vĩnh Long",type:1,san:"UPCOM"},{code:"VLG",fullname_vi:"CTCP VIMC Logistics",type:1,san:"UPCOM"},{code:"VLP",fullname_vi:"CTCP Công trình Công cộng Vĩnh Long",type:1,san:"UPCOM"},{code:"VLW",fullname_vi:"CTCP Cấp nước Vĩnh Long",type:1,san:"UPCOM"},{code:"VMA",fullname_vi:"CTCP Công nghiệp Ô tô - Vinacomin",type:1,san:"UPCOM"},{code:"VMC",fullname_vi:"CTCP Vimeco",type:1,san:"HNX"},{code:"VMD",fullname_vi:"CTCP Y Dược phẩm Vimedimex",type:1,san:"HOSE"},{code:"VMG",fullname_vi:"CTCP Thương mại và Dịch vụ Dầu khí Vũng Tàu",type:1,san:"UPCOM"},{code:"VMS",fullname_vi:"CTCP Phát triển Hàng Hải",type:1,san:"HNX"},{code:"VMT",fullname_vi:"CTCP Giao nhận Vận tải Miền Trung",type:1,san:"UPCOM"},{code:"VNA",fullname_vi:"CTCP Vận tải Biển Vinaship",type:1,san:"UPCOM"},{code:"VNB",fullname_vi:"CTCP Sách Việt Nam",type:1,san:"UPCOM"},{code:"VNC",fullname_vi:"CTCP Tập đoàn Vinacontrol",type:1,san:"HNX"},{code:"VNE",fullname_vi:"Tổng CTCP Xây dựng Điện Việt Nam",type:1,san:"HOSE"},{code:"VNF",fullname_vi:"CTCP Vinafreight",type:1,san:"HNX"},{code:"VNG",fullname_vi:"CTCP Du lịch Thành Thành Công",type:1,san:"HOSE"},{code:"VNH",fullname_vi:"CTCP Đầu tư Việt Việt Nhật",type:1,san:"UPCOM"},{code:"VNI",fullname_vi:"CTCP Đầu tư Bất động sản Việt Nam",type:1,san:"UPCOM"},{code:"VNL",fullname_vi:"CTCP Logistics Vinalink",type:1,san:"HOSE"},{code:"VNM",fullname_vi:"CTCP Sữa Việt Nam",type:1,san:"HOSE"},{code:"VNP",fullname_vi:"CTCP Nhựa Việt Nam",type:1,san:"UPCOM"},{code:"VNS",fullname_vi:"CTCP Ánh Dương Việt Nam",type:1,san:"HOSE"},{code:"VNT",fullname_vi:"CTCP Giao nhận Vận tải Ngoại thương",type:1,san:"HNX"},{code:"VNX",fullname_vi:"CTCP Quảng cáo và Hội chợ Thương mại",type:1,san:"UPCOM"},{code:"VNY",fullname_vi:"CTCP Thuốc thú y Trung ương I",type:1,san:"UPCOM"},{code:"VNZ",fullname_vi:"CTCP VNG",type:1,san:"UPCOM"},{code:"VOC",fullname_vi:"Tổng Công ty Công Nghiệp Dầu Thực Vật Việt Nam - CTCP",type:1,san:"UPCOM"},{code:"VOS",fullname_vi:"CTCP Vận tải Biển Việt Nam",type:1,san:"HOSE"},{code:"VPA",fullname_vi:"CTCP Vận tải Hoá Dầu VP",type:1,san:"UPCOM"},{code:"VPC",fullname_vi:"CTCP Đầu tư và Phát triển Năng lượng Việt Nam",type:1,san:"UPCOM"},{code:"VPD",fullname_vi:"CTCP Phát triển Điện lực Việt Nam",type:1,san:"HOSE"},{code:"VPG",fullname_vi:"CTCP Đầu tư Thương mại Xuất nhập khẩu Việt Phát",type:1,san:"HOSE"},{code:"VPH",fullname_vi:"CTCP Vạn Phát Hưng",type:1,san:"HOSE"},{code:"VPI",fullname_vi:"CTCP Đầu tư Văn Phú - INVEST",type:1,san:"HOSE"},{code:"VPR",fullname_vi:"CTCP VinaPrint",type:1,san:"UPCOM"},{code:"VPS",fullname_vi:"CTCP Thuốc sát trùng Việt Nam (VIPESCO)",type:1,san:"HOSE"},{code:"VPW",fullname_vi:"CTCP Cấp thoát nước Số 1 Vĩnh Phúc",type:1,san:"UPCOM"},{code:"VQC",fullname_vi:"CTCP Giám định - Vinacomin",type:1,san:"UPCOM"},{code:"VRC",fullname_vi:"CTCP Bất động sản và Đầu tư VRC",type:1,san:"HOSE"},{code:"VRE",fullname_vi:"CTCP Vincom Retail",type:1,san:"HOSE"},{code:"VRG",fullname_vi:"CTCP Phát triển Đô thị và Khu công nghiệp Cao su Việt Nam",type:1,san:"UPCOM"},{code:"VSA",fullname_vi:"CTCP Đại lý Hàng hải Việt Nam",type:1,san:"HNX"},{code:"VSC",fullname_vi:"CTCP Container Việt Nam",type:1,san:"HOSE"},{code:"VSE",fullname_vi:"CTCP Dịch vụ Đường cao tốc Việt Nam",type:1,san:"UPCOM"},{code:"VSF",fullname_vi:"Tổng Công ty Lương thực Miền Nam - CTCP",type:1,san:"UPCOM"},{code:"VSG",fullname_vi:"CTCP Container Phía Nam",type:1,san:"UPCOM"},{code:"VSH",fullname_vi:"CTCP Thủy điện Vĩnh Sơn - Sông Hinh",type:1,san:"HOSE"},{code:"VSI",fullname_vi:"CTCP Đầu tư và Xây dựng Cấp thoát nước",type:1,san:"HOSE"},{code:"VSM",fullname_vi:"CTCP Container Miền Trung",type:1,san:"HNX"},{code:"VSN",fullname_vi:"CTCP Việt Nam Kỹ nghệ Súc sản",type:1,san:"UPCOM"},{code:"VST",fullname_vi:"CTCP Vận tải và Thuê tàu biển Việt Nam",type:1,san:"UPCOM"},{code:"VTA",fullname_vi:"CTCP Vitaly",type:1,san:"UPCOM"},{code:"VTB",fullname_vi:"CTCP Viettronics Tân Bình",type:1,san:"HOSE"},{code:"VTC",fullname_vi:"CTCP Viễn thông VTC",type:1,san:"HNX"},{code:"VTD",fullname_vi:"CTCP Du lịch Vietourist",type:1,san:"UPCOM"},{code:"VTE",fullname_vi:"CTCP VINACAP Kim Long",type:1,san:"UPCOM"},{code:"VTG",fullname_vi:"CTCP Du lịch Tỉnh Bà Rịa - Vũng Tàu",type:1,san:"UPCOM"},{code:"VTH",fullname_vi:"CTCP Dây cáp Điện Việt Thái",type:1,san:"HNX"},{code:"VTI",fullname_vi:"CTCP Sản xuất - Xuất nhập khẩu Dệt may",type:1,san:"UPCOM"},{code:"VTJ",fullname_vi:"CTCP Thương mại và Đầu tư VI NA TA BA",type:1,san:"HNX"},{code:"VTK",fullname_vi:"CTCP Tư vấn Thiết kế Viettel",type:1,san:"UPCOM"},{code:"VTL",fullname_vi:"CTCP Vang Thăng Long",type:1,san:"UPCOM"},{code:"VTM",fullname_vi:"CTCP Vận tải và Đưa đón thợ mỏ - VINACOMIN",type:1,san:"UPCOM"},{code:"VTO",fullname_vi:"CTCP Vận tải Xăng dầu Vitaco",type:1,san:"HOSE"},{code:"VTP",fullname_vi:"Tổng CTCP Bưu chính Viettel",type:1,san:"HOSE"},{code:"VTQ",fullname_vi:"CTCP Việt Trung Quảng Bình ",type:1,san:"UPCOM"},{code:"VTR",fullname_vi:"CTCP Du lịch và Tiếp thị Giao thông Vận tải Việt Nam - Vietravel",type:1,san:"UPCOM"},{code:"VTS",fullname_vi:"CTCP Viglacera Từ Sơn",type:1,san:"UPCOM"},{code:"VTV",fullname_vi:"CTCP Năng lượng và Môi trường VICEM",type:1,san:"HNX"},{code:"VTX",fullname_vi:"CTCP Vận tải Đa Phương Thức Vietranstimex",type:1,san:"UPCOM"},{code:"VTZ",fullname_vi:"CTCP Sản xuất và Thương mại Nhựa Việt Thành",type:1,san:"HNX"},{code:"VVN",fullname_vi:"Tổng CTCP Xây dựng Công nghiệp Việt Nam",type:1,san:"UPCOM"},{code:"VVS",fullname_vi:"CTCP Đầu tư Phát triển máy Việt Nam",type:1,san:"UPCOM"},{code:"VW3",fullname_vi:"CTCP Viwaseen3",type:1,san:"UPCOM"},{code:"VWS",fullname_vi:"CTCP Nước và Môi Trường Việt Nam",type:1,san:"UPCOM"},{code:"VXB",fullname_vi:"CTCP Vật liệu Xây dựng Bến Tre",type:1,san:"UPCOM"},{code:"VXP",fullname_vi:"CTCP Thuốc Thú y Trung ương VETVACO",type:1,san:"UPCOM"},{code:"VXT",fullname_vi:"CTCP Kho vận và Dịch vụ Thương mại",type:1,san:"UPCOM"},{code:"WCS",fullname_vi:"CTCP Bến xe Miền Tây",type:1,san:"HNX"},{code:"WSB",fullname_vi:"CTCP Bia Sài Gòn - Miền Tây",type:1,san:"UPCOM"},{code:"WTC",fullname_vi:"CTCP Vận tải Thủy - Vinacomin",type:1,san:"UPCOM"},{code:"X20",fullname_vi:"CTCP X20",type:1,san:"HNX"},{code:"X26",fullname_vi:"CTCP 26",type:1,san:"UPCOM"},{code:"X77",fullname_vi:"CTCP Thành An 77",type:1,san:"UPCOM"},{code:"XDC",fullname_vi:"CTCP Xây dựng Công trình Tân Cảng",type:1,san:""},{code:"XDH",fullname_vi:"CTCP Đầu tư Xây dựng Dân dụng Hà Nội",type:1,san:"UPCOM"},{code:"XHC",fullname_vi:"CTCP Xuân Hòa Việt Nam",type:1,san:"UPCOM"},{code:"XLV",fullname_vi:"CTCP Xây Lắp và Dịch vụ Sông Đà",type:1,san:"UPCOM"},{code:"XMC",fullname_vi:"CTCP Đầu tư và Xây dựng Xuân Mai",type:1,san:"UPCOM"},{code:"XMD",fullname_vi:"CTCP Xuân Mai - Đạo Tú",type:1,san:"UPCOM"},{code:"XMP",fullname_vi:"CTCP Thủy điện Xuân Minh",type:1,san:"UPCOM"},{code:"XPH",fullname_vi:"CTCP Xà phòng Hà Nội",type:1,san:"UPCOM"},{code:"YBC",fullname_vi:"CTCP Xi măng và Khoáng sản Yên Bái",type:1,san:"UPCOM"},{code:"YBM",fullname_vi:"CTCP Khoáng sản Công nghiệp Yên Bái",type:1,san:"HOSE"},{code:"YEG",fullname_vi:"CTCP Tập đoàn Yeah1",type:1,san:"HOSE"},{code:"YTC",fullname_vi:"CTCP Xuất nhập khẩu Y tế Thành phố Hồ Chí Minh",type:1,san:"UPCOM"},{code:"AAT",fullname_vi:"CTCP Tập Đoàn Tiên Sơn Thanh Hóa",type:1,san:"HOSE"},{code:"AAV",fullname_vi:"CTCP Việt Tiên Sơn Địa ốc",type:1,san:"HNX"},{code:"ABC",fullname_vi:"CTCP Truyền thông VMG",type:1,san:"UPCOM"},{code:"ABR",fullname_vi:"CTCP Đầu tư Nhãn hiệu Việt",type:1,san:"HOSE"},{code:"ABS",fullname_vi:"CTCP Dịch vụ Nông nghiệp Bình Thuận",type:1,san:"HOSE"},{code:"ABT",fullname_vi:"CTCP Xuất nhập khẩu Thủy sản Bến Tre",type:1,san:"HOSE"},{code:"ACC",fullname_vi:"CTCP Đầu tư và Xây dựng Bình Dương ACC",type:1,san:"HOSE"},{code:"ACE",fullname_vi:"CTCP Bê tông Ly tâm An Giang",type:1,san:"UPCOM"},{code:"ACG",fullname_vi:"CTCP Gỗ An Cường",type:1,san:"HOSE"},{code:"ACL",fullname_vi:"CTCP Xuất nhập khẩu Thủy sản Cửu Long An Giang",type:1,san:"HOSE"},{code:"ACM",fullname_vi:"CTCP Tập đoàn Khoáng sản Á Cường",type:1,san:"UPCOM"},{code:"ACS",fullname_vi:"CTCP Xây lắp Thương mại 2",type:1,san:"UPCOM"},{code:"ACV",fullname_vi:"Tổng Công ty Cảng Hàng không Việt Nam - CTCP",type:1,san:"UPCOM"},{code:"ADC",fullname_vi:"CTCP Mỹ thuật và Truyền thông",type:1,san:"HNX"},{code:"ADG",fullname_vi:"CTCP Clever Group",type:1,san:"HOSE"},{code:"ADP",fullname_vi:"CTCP Sơn Á Đông",type:1,san:"HOSE"},{code:"ADS",fullname_vi:"CTCP Damsan",type:1,san:"HOSE"},{code:"AFX",fullname_vi:"CTCP Xuất nhập khẩu Nông sản Thực phẩm An Giang",type:1,san:"UPCOM"},{code:"AG1",fullname_vi:"CTCP 28.1",type:1,san:"UPCOM"},{code:"AGE",fullname_vi:"CTCP Môi trường Đô thị An Giang",type:1,san:""},{code:"AGF",fullname_vi:"CTCP Xuất nhập khẩu Thủy sản An Giang",type:1,san:"UPCOM"},{code:"AGG",fullname_vi:"CTCP Đầu tư và Phát triển Bất động sản An Gia",type:1,san:"HOSE"},{code:"AGM",fullname_vi:"CTCP Xuất nhập khẩu An Giang",type:1,san:"HOSE"},{code:"AGP",fullname_vi:"CTCP Dược phẩm Agimexpharm",type:1,san:"UPCOM"},{code:"AGX",fullname_vi:"CTCP Thực phẩm Nông Sản xuất khẩu Sài Gòn",type:1,san:"UPCOM"},{code:"ALT",fullname_vi:"CTCP Văn hóa Tân Bình",type:1,san:"HNX"},{code:"ALV",fullname_vi:"CTCP Xây dựng ALVICO",type:1,san:"UPCOM"},{code:"AMC",fullname_vi:"CTCP Khoáng sản Á Châu",type:1,san:"HNX"},{code:"AMD",fullname_vi:"CTCP Đầu tư và Khoáng sản FLC Stone",type:1,san:"UPCOM"},{code:"AME",fullname_vi:"CTCP Alphanam E&C",type:1,san:"HNX"},{code:"AMP",fullname_vi:"CTCP Armephaco",type:1,san:"UPCOM"},{code:"AMS",fullname_vi:"CTCP Cơ khí Xây dựng AMECC",type:1,san:"UPCOM"},{code:"AMV",fullname_vi:"CTCP Sản xuất Kinh doanh Dược và Trang thiết bị Y tế Việt Mỹ",type:1,san:"HNX"},{code:"ANT",fullname_vi:"CTCP Rau quả Thực phẩm An Giang",type:1,san:"UPCOM"},{code:"ANV",fullname_vi:"CTCP Nam Việt",type:1,san:"HOSE"},{code:"APC",fullname_vi:"CTCP Chiếu xạ An Phú",type:1,san:"HOSE"},{code:"APF",fullname_vi:"CTCP Nông sản Thực phẩm Quảng Ngãi",type:1,san:"UPCOM"},{code:"APH",fullname_vi:"CTCP Tập đoàn An Phát Holdings",type:1,san:"HOSE"},{code:"API",fullname_vi:"CTCP Đầu tư Châu Á - Thái Bình Dương",type:1,san:"HNX"},{code:"APL",fullname_vi:"CTCP Cơ khí và Thiết bị áp lực - VVMI",type:1,san:"UPCOM"},{code:"APP",fullname_vi:"CTCP Phát triển Phụ gia và Sản phẩm Dầu Mỏ",type:1,san:"UPCOM"},{code:"APT",fullname_vi:"CTCP Kinh doanh Thủy Hải Sản Sài Gòn",type:1,san:"UPCOM"},{code:"ARM",fullname_vi:"CTCP Xuất nhập khẩu Hàng không",type:1,san:"HNX"},{code:"ASA",fullname_vi:"CTCP ASA",type:1,san:"UPCOM"},{code:"ASG",fullname_vi:"CTCP Tập đoàn ASG",type:1,san:"HOSE"},{code:"ASM",fullname_vi:"CTCP Tập đoàn Sao Mai",type:1,san:"HOSE"},{code:"ASP",fullname_vi:"CTCP Tập đoàn Dầu khí An Pha",type:1,san:"HOSE"},{code:"AST",fullname_vi:"CTCP Dịch vụ Hàng không Taseco",type:1,san:"HOSE"},{code:"ATA",fullname_vi:"CTCP Ntaco",type:1,san:"UPCOM"},{code:"ATB",fullname_vi:"CTCP An Thịnh",type:1,san:"UPCOM"},{code:"ATG",fullname_vi:"CTCP An Trường An",type:1,san:"UPCOM"},{code:"ATS",fullname_vi:"CTCP Tập Đoàn Dược Phẩm Atesco",type:1,san:"HNX"},{code:"AVC",fullname_vi:"CTCP Thủy điện A Vương",type:1,san:"UPCOM"},{code:"AVF",fullname_vi:"CTCP Việt An",type:1,san:"UPCOM"},{code:"B82",fullname_vi:"CTCP 482",type:1,san:"UPCOM"},{code:"BAF",fullname_vi:"CTCP Nông nghiệp BAF Việt Nam",type:1,san:"HOSE"},{code:"BAL",fullname_vi:"CTCP Bao bì Bia - Rượu - Nước giải khát",type:1,san:"UPCOM"},{code:"BAX",fullname_vi:"CTCP Thống Nhất",type:1,san:"HNX"},{code:"BBC",fullname_vi:"CTCP Bibica",type:1,san:"HOSE"},{code:"BBH",fullname_vi:"CTCP Bao bì Hoàng Thạch",type:1,san:"UPCOM"},{code:"BBM",fullname_vi:"CTCP Bia Hà Nội - Nam Định",type:1,san:"UPCOM"},{code:"BBS",fullname_vi:"CTCP VICEM Bao bì Bút Sơn",type:1,san:"HNX"},{code:"BBT",fullname_vi:"CTCP Bông Bạch Tuyết",type:1,san:"UPCOM"},{code:"BCA",fullname_vi:"CTCP B.C.H",type:1,san:"UPCOM"},{code:"BCB",fullname_vi:"CTCP 397",type:1,san:"UPCOM"},{code:"BCC",fullname_vi:"CTCP Xi măng Bỉm Sơn",type:1,san:"HNX"},{code:"BCE",fullname_vi:"CTCP Xây dựng và Giao thông Bình Dương",type:1,san:"HOSE"},{code:"BCF",fullname_vi:"CTCP Thực phẩm Bích Chi",type:1,san:"HNX"},{code:"BCG",fullname_vi:"CTCP Bamboo Capital",type:1,san:"HOSE"},{code:"BCM",fullname_vi:"Tổng Công ty Đầu tư và Phát triển Công nghiệp – CTCP",type:1,san:"HOSE"},{code:"BCP",fullname_vi:"CTCP Dược ENLIE",type:1,san:"UPCOM"},{code:"BCV",fullname_vi:"CTCP Du lịch và Thương mại Bằng Giang Cao Bằng - Vimico",type:1,san:"UPCOM"},{code:"BDB",fullname_vi:"CTCP Sách và Thiết bị Bình Định",type:1,san:"HNX"},{code:"BDG",fullname_vi:"CTCP May mặc Bình Dương",type:1,san:"UPCOM"},{code:"BDT",fullname_vi:"CTCP Xây lắp và Vật liệu Xây dựng Đồng Tháp",type:1,san:"UPCOM"},{code:"BDW",fullname_vi:"CTCP Cấp thoát nước Bình Định",type:1,san:"UPCOM"},{code:"BED",fullname_vi:"CTCP Sách và Thiết bị Trường học Đà Nẵng",type:1,san:"HNX"},{code:"BEL",fullname_vi:"CTCP Điện tử Biên Hòa",type:1,san:"UPCOM"},{code:"BFC",fullname_vi:"CTCP Phân bón Bình Điền",type:1,san:"HOSE"},{code:"BGW",fullname_vi:"CTCP Nước sạch Bắc Giang",type:1,san:"UPCOM"},{code:"BHA",fullname_vi:"CTCP Thủy điện Bắc Hà",type:1,san:"UPCOM"},{code:"BHC",fullname_vi:"CTCP Bê tông Biên Hòa",type:1,san:"UPCOM"},{code:"BHG",fullname_vi:"CTCP Chè Biển Hồ",type:1,san:"UPCOM"},{code:"BHK",fullname_vi:"CTCP Bia Hà Nội - Kim Bài",type:1,san:"UPCOM"},{code:"BHN",fullname_vi:"Tổng CTCP Bia - Rượu - Nước giải khát Hà Nội",type:1,san:"HOSE"},{code:"BHP",fullname_vi:"CTCP Bia Hà Nội - Hải Phòng",type:1,san:"UPCOM"},{code:"BIG",fullname_vi:"CTCP Big Invest Group",type:1,san:"UPCOM"},{code:"BII",fullname_vi:"CTCP Louis Land",type:1,san:"UPCOM"},{code:"BIO",fullname_vi:"CTCP Vắc xin và Sinh phẩm Nha Trang",type:1,san:"UPCOM"},{code:"BKC",fullname_vi:"CTCP khoáng sản Bắc Kạn",type:1,san:"HNX"},{code:"BKG",fullname_vi:"CTCP Đầu tư BKG Việt Nam",type:1,san:"HOSE"},{code:"BKH",fullname_vi:"CTCP Bánh mứt kẹo Hà Nội",type:1,san:""},{code:"BLF",fullname_vi:"CTCP Thủy sản Bạc Liêu",type:1,san:"UPCOM"},{code:"BLN",fullname_vi:"CTCP Vận tải và Dịch vụ Liên Ninh",type:1,san:"UPCOM"},{code:"BLT",fullname_vi:"CTCP Lương thực Bình Định",type:1,san:"UPCOM"},{code:"BLW",fullname_vi:"CTCP Cấp nước Bạc Liêu",type:1,san:""},{code:"BMC",fullname_vi:"CTCP Khoáng sản Bình Định",type:1,san:"HOSE"},{code:"BMD",fullname_vi:"CTCP Môi trường và Dịch vụ Đô thị Bình Thuận",type:1,san:"UPCOM"},{code:"BMF",fullname_vi:"CTCP Vật liệu Xây dựng và Chất đốt Đồng Nai",type:1,san:"UPCOM"},{code:"BMG",fullname_vi:"CTCP May Bình Minh",type:1,san:"UPCOM"},{code:"BMJ",fullname_vi:"CTCP Khoáng sản Miền Đông AHP",type:1,san:"UPCOM"},{code:"BMN",fullname_vi:"CTCP 715",type:1,san:"UPCOM"},{code:"BMP",fullname_vi:"CTCP Nhựa Bình Minh",type:1,san:"HOSE"},{code:"BMV",fullname_vi:"CTCP Bột mỳ Vinafood 1",type:1,san:"UPCOM"},{code:"BNA",fullname_vi:"CTCP Đầu tư Sản xuất Bảo Ngọc",type:1,san:"HNX"},{code:"BNW",fullname_vi:"CTCP Nước sạch Bắc Ninh",type:1,san:"UPCOM"},{code:"BOT",fullname_vi:"CTCP BOT Cầu Thái Hà",type:1,san:"UPCOM"},{code:"BPC",fullname_vi:"CTCP VICEM Bao bì Bỉm Sơn",type:1,san:"HNX"},{code:"BQB",fullname_vi:"CTCP Bia Hà Nội - Quảng Bình",type:1,san:"UPCOM"},{code:"BRC",fullname_vi:"CTCP Cao su Bến Thành",type:1,san:"HOSE"},{code:"BRR",fullname_vi:"CTCP Cao su Bà Rịa",type:1,san:"UPCOM"},{code:"BRS",fullname_vi:"CTCP Dịch vụ Đô thị Bà Rịa",type:1,san:"UPCOM"},{code:"BSA",fullname_vi:"CTCP Thủy điện Buôn Đôn",type:1,san:"UPCOM"},{code:"BSC",fullname_vi:"CTCP Dịch vụ Bến Thành",type:1,san:"HNX"},{code:"BSD",fullname_vi:"CTCP Bia, Rượu Sài Gòn - Đồng Xuân",type:1,san:"UPCOM"},{code:"BSG",fullname_vi:"CTCP Xe khách Sài Gòn",type:1,san:"UPCOM"},{code:"BSH",fullname_vi:"CTCP Bia Sài Gòn - Hà Nội",type:1,san:"UPCOM"},{code:"BSL",fullname_vi:"CTCP Bia Sài Gòn - Sông Lam",type:1,san:"UPCOM"},{code:"BSP",fullname_vi:"CTCP Bia Sài Gòn - Phú Thọ",type:1,san:"UPCOM"},{code:"BSQ",fullname_vi:"CTCP Bia Sài Gòn - Quảng Ngãi",type:1,san:"UPCOM"},{code:"BSR",fullname_vi:"CTCP Lọc hóa Dầu Bình Sơn",type:1,san:"UPCOM"},{code:"BST",fullname_vi:"CTCP Sách và Thiết bị Bình Thuận",type:1,san:"HNX"},{code:"BT1",fullname_vi:"CTCP Bảo vệ Thực vật 1 Trung Ương",type:1,san:"UPCOM"},{code:"BT6",fullname_vi:"CTCP Beton 6",type:1,san:"UPCOM"},{code:"BTB",fullname_vi:"CTCP Bia Hà Nội - Thái Bình",type:1,san:"UPCOM"},{code:"BTD",fullname_vi:"CTCP Bê tông Ly tâm Thủ Đức",type:1,san:"UPCOM"},{code:"BTG",fullname_vi:"CTCP Bao bì Tiền Giang",type:1,san:"UPCOM"},{code:"BTH",fullname_vi:"CTCP Chế tạo Biến thế và Vật liệu Điện Hà Nội",type:1,san:"UPCOM"},{code:"BTN",fullname_vi:"CTCP Đầu tư Bitco Bình Định",type:1,san:"UPCOM"},{code:"BTP",fullname_vi:"CTCP Nhiệt điện Bà Rịa",type:1,san:"HOSE"},{code:"BTS",fullname_vi:"CTCP Xi măng VICEM Bút Sơn",type:1,san:"HNX"},{code:"BTT",fullname_vi:"CTCP Thương mại Dịch vụ Bến Thành",type:1,san:"HOSE"},{code:"BTU",fullname_vi:"CTCP Công trình Đô thị Bến Tre",type:1,san:"UPCOM"},{code:"BTV",fullname_vi:"CTCP Dịch vụ Du lịch Bến Thành",type:1,san:"UPCOM"},{code:"BTW",fullname_vi:"CTCP Cấp nước Bến Thành",type:1,san:"HNX"},{code:"BVG",fullname_vi:"CTCP GROUP BẮC VIỆT",type:1,san:"UPCOM"},{code:"BVL",fullname_vi:"CTCP BV Land",type:1,san:"UPCOM"},{code:"BVN",fullname_vi:"CTCP Bông Việt Nam",type:1,san:"UPCOM"},{code:"BWA",fullname_vi:"CTCP Cấp thoát nước và Xây dựng Bảo Lộc",type:1,san:"UPCOM"},{code:"BWE",fullname_vi:"CTCP - Tổng công ty Nước - Môi trường Bình Dương",type:1,san:"HOSE"},{code:"BWS",fullname_vi:"CTCP Cấp nước Bà Rịa - Vũng Tàu",type:1,san:"UPCOM"},{code:"BXH",fullname_vi:"CTCP VICEM Bao bì Hải Phòng",type:1,san:"HNX"},{code:"C12",fullname_vi:"CTCP Cầu 12",type:1,san:"UPCOM"},{code:"C21",fullname_vi:"CTCP Thế Kỷ 21",type:1,san:"UPCOM"},{code:"C22",fullname_vi:"CTCP 22",type:1,san:"UPCOM"},{code:"C32",fullname_vi:"CTCP CIC39",type:1,san:"HOSE"},{code:"C47",fullname_vi:"CTCP Xây dựng 47",type:1,san:"HOSE"},{code:"C4G",fullname_vi:"CTCP Tập đoàn CIENCO4",type:1,san:"UPCOM"},{code:"C69",fullname_vi:"CTCP Xây dựng 1369",type:1,san:"HNX"},{code:"C92",fullname_vi:"CTCP Xây dựng và Đầu tư 492",type:1,san:"UPCOM"},{code:"CAB",fullname_vi:"CTCP Tổng Công ty Truyền hình Cáp Việt Nam",type:1,san:"UPCOM"},{code:"CAD",fullname_vi:"CTCP Chế biến và Xuất nhập khẩu Thủy sản Cadovimex",type:1,san:"UPCOM"},{code:"CAG",fullname_vi:"CTCP Cảng An Giang",type:1,san:"HNX"},{code:"CAN",fullname_vi:"CTCP Đồ hộp Hạ Long",type:1,san:"HNX"},{code:"CAP",fullname_vi:"CTCP Lâm Nông sản Thực phẩm Yên Bái",type:1,san:"HNX"},{code:"CAR",fullname_vi:"CTCP Tập đoàn Giáo dục Trí Việt",type:1,san:"UPCOM"},{code:"CAT",fullname_vi:"CTCP Thủy sản Cà Mau",type:1,san:"UPCOM"},{code:"CAV",fullname_vi:"CTCP Dây Cáp điện Việt Nam",type:1,san:"HOSE"},{code:"CBI",fullname_vi:"CTCP Gang thép Cao Bằng",type:1,san:"UPCOM"},{code:"CBS",fullname_vi:"CTCP Mía Đường Cao Bằng",type:1,san:"UPCOM"},{code:"CC1",fullname_vi:"Tổng Công ty Xây dựng Số 1 - CTCP",type:1,san:"UPCOM"},{code:"CC4",fullname_vi:"CTCP Đầu tư và Xây dựng Số 4",type:1,san:"UPCOM"},{code:"CCA",fullname_vi:"CTCP Xuất nhập khẩu Thuỷ sản Cần Thơ",type:1,san:"UPCOM"},{code:"CCI",fullname_vi:"CTCP Đầu tư Phát triển Công nghiệp Thương mại Củ Chi",type:1,san:"HOSE"},{code:"CCL",fullname_vi:"CTCP Đầu Tư và Phát triển Đô Thị Dầu khí Cửu Long",type:1,san:"HOSE"},{code:"CCM",fullname_vi:"CTCP khoáng sản và Xi măng Cần Thơ",type:1,san:"UPCOM"},{code:"CCP",fullname_vi:"CTCP Cảng Cửa Cấm Hải Phòng",type:1,san:"UPCOM"},{code:"CCR",fullname_vi:"CTCP Cảng Cam Ranh",type:1,san:"HNX"},{code:"CCT",fullname_vi:"CTCP Cảng Cần Thơ",type:1,san:"UPCOM"},{code:"CCV",fullname_vi:"CTCP Tư vấn Xây dựng Công nghiệp và Đô thị Việt Nam",type:1,san:"UPCOM"},{code:"CDC",fullname_vi:"CTCP Chương Dương",type:1,san:"HOSE"},{code:"CDG",fullname_vi:"CTCP Cầu Đuống",type:1,san:"UPCOM"},{code:"CDH",fullname_vi:"CTCP Công trình Công cộng và Dịch vụ Du lịch Hải Phòng",type:1,san:"UPCOM"},{code:"CDN",fullname_vi:"CTCP Cảng Đà Nẵng",type:1,san:"HNX"},{code:"CDO",fullname_vi:"CTCP Tư vấn Thiết kế và Phát triển Đô thị",type:1,san:"UPCOM"},{code:"CDP",fullname_vi:"CTCP Dược phẩm Trung ương Codupha",type:1,san:"UPCOM"},{code:"CDR",fullname_vi:"CTCP Xây dựng Cao su Đồng Nai",type:1,san:"UPCOM"},{code:"CE1",fullname_vi:"CTCP Xây dựng và Thiết bị Công nghiệp CIE1",type:1,san:"UPCOM"},{code:"CEG",fullname_vi:"CTCP Tập đoàn Xây dựng và Thiết bị Công nghiệp",type:1,san:"UPCOM"},{code:"CEN",fullname_vi:"CTCP CENCON Việt Nam",type:1,san:"UPCOM"},{code:"CEO",fullname_vi:"CTCP Tập đoàn C.E.O",type:1,san:"HNX"},{code:"CET",fullname_vi:"CTCP HTC Holding",type:1,san:"HNX"},{code:"CFM",fullname_vi:"CTCP Đầu tư CFM",type:1,san:"UPCOM"},{code:"CFV",fullname_vi:"CTCP Cà phê Thắng Lợi",type:1,san:"UPCOM"},{code:"CGV",fullname_vi:"CTCP Sành sứ Thủy tinh Việt Nam",type:1,san:"UPCOM"},{code:"CH5",fullname_vi:"CTCP Xây dựng Số 5 Hà Nội",type:1,san:"UPCOM"},{code:"CHC",fullname_vi:"CTCP Cẩm Hà",type:1,san:"UPCOM"},{code:"CHP",fullname_vi:"CTCP Thủy điện Miền Trung",type:1,san:"HOSE"},{code:"CHS",fullname_vi:"CTCP Chiếu sáng Công cộng Thành phố Hồ Chí Minh",type:1,san:"UPCOM"},{code:"CI5",fullname_vi:"CTCP Đầu Tư Xây dựng Số 5",type:1,san:"UPCOM"},{code:"CIA",fullname_vi:"CTCP Dịch vụ Sân bay Quốc tế Cam Ranh",type:1,san:"HNX"},{code:"CID",fullname_vi:"CTCP Xây dựng và Phát triển Cơ sở Hạ tầng",type:1,san:"UPCOM"},{code:"CIG",fullname_vi:"CTCP COMA 18",type:1,san:"HOSE"},{code:"CII",fullname_vi:"CTCP Đầu tư Hạ tầng Kỹ thuật Thành phố Hồ Chí Minh",type:1,san:"HOSE"},{code:"CIP",fullname_vi:"CTCP Xây lắp và Sản xuất Công nghiệp",type:1,san:"UPCOM"},{code:"CJC",fullname_vi:"CTCP Cơ điện Miền Trung",type:1,san:"HNX"},{code:"CK8",fullname_vi:"CTCP Cơ Khí 120",type:1,san:"UPCOM"},{code:"CKA",fullname_vi:"CTCP Cơ Khí An Giang",type:1,san:"UPCOM"},{code:"CKD",fullname_vi:"CTCP Cơ khí Đông Anh LICOGI",type:1,san:"UPCOM"},{code:"CKG",fullname_vi:"CTCP Tập đoàn Tư vấn Đầu tư Xây dựng Kiên Giang",type:1,san:"HOSE"},{code:"CKV",fullname_vi:"CTCP COKYVINA",type:1,san:"HNX"},{code:"CLC",fullname_vi:"CTCP Cát Lợi",type:1,san:"HOSE"},{code:"CLG",fullname_vi:"CTCP Đầu tư và Phát triển Nhà đất COTEC",type:1,san:"UPCOM"},{code:"CLH",fullname_vi:"CTCP Xi măng La Hiên VVMI",type:1,san:"HNX"},{code:"CLL",fullname_vi:"CTCP Cảng Cát Lái",type:1,san:"HOSE"},{code:"CLM",fullname_vi:"CTCP Xuất nhập khẩu Than - Vinacomin",type:1,san:"HNX"},{code:"CLW",fullname_vi:"CTCP Cấp nước Chợ Lớn",type:1,san:"HOSE"},{code:"CLX",fullname_vi:"CTCP Xuất nhập khẩu và Đầu tư Chợ Lớn (CHOLIMEX)",type:1,san:"UPCOM"},{code:"CMC",fullname_vi:"CTCP Đầu tư CMC",type:1,san:"HNX"},{code:"CMD",fullname_vi:"CTCP Vật liệu Xây dựng và Trang trí nội thất Thành phố Hồ Chí Minh",type:1,san:"UPCOM"},{code:"CMF",fullname_vi:"CTCP Thực phẩm Cholimex",type:1,san:"UPCOM"},{code:"CMG",fullname_vi:"CTCP Tập đoàn Công nghệ CMC",type:1,san:"HOSE"},{code:"CMI",fullname_vi:"CTCP CMISTONE Việt Nam",type:1,san:"UPCOM"},{code:"CMK",fullname_vi:"CTCP Cơ khí Mạo Khê - Vinacomin",type:1,san:"UPCOM"},{code:"CMM",fullname_vi:"CTCP Camimex",type:1,san:"UPCOM"},{code:"CMN",fullname_vi:"CTCP Lương thực Thực phẩm Colusa - Miliket",type:1,san:"UPCOM"},{code:"CMP",fullname_vi:"CTCP Cảng Chân Mây",type:1,san:"UPCOM"},{code:"CMS",fullname_vi:"CTCP Tập Đoàn CMH Việt Nam",type:1,san:"HNX"},{code:"CMT",fullname_vi:"CTCP Công nghệ Mạng và Truyền thông",type:1,san:"UPCOM"},{code:"CMV",fullname_vi:"CTCP Thương nghiệp Cà Mau",type:1,san:"HOSE"},{code:"CMW",fullname_vi:"CTCP Cấp nước Cà Mau",type:1,san:"UPCOM"},{code:"CMX",fullname_vi:"CTCP Camimex Group",type:1,san:"HOSE"},{code:"CNA",fullname_vi:"CTCP Tổng Công ty Chè Nghệ An",type:1,san:"UPCOM"},{code:"CNC",fullname_vi:"CTCP Công nghệ Cao Traphaco",type:1,san:"UPCOM"},{code:"CNG",fullname_vi:"CTCP CNG Việt Nam",type:1,san:"HOSE"},{code:"CNN",fullname_vi:"CTCP Tư vấn Công nghệ Thiết bị và Kiểm Định Xây dựng - Coninco",type:1,san:"UPCOM"},{code:"CNT",fullname_vi:"CTCP Tập đoàn CNT",type:1,san:"UPCOM"},{code:"COM",fullname_vi:"CTCP Vật tư Xăng Dầu",type:1,san:"HOSE"},{code:"CPA",fullname_vi:"CTCP Cà phê Phước An",type:1,san:"UPCOM"},{code:"CPC",fullname_vi:"CTCP Thuốc sát trùng Cần Thơ",type:1,san:"HNX"},{code:"CPH",fullname_vi:"CTCP Phục vụ Mai táng Hải Phòng",type:1,san:"UPCOM"},{code:"CPI",fullname_vi:"CTCP Đầu tư Cảng Cái Lân",type:1,san:"UPCOM"},{code:"CQN",fullname_vi:"CTCP Cảng Quảng Ninh",type:1,san:"UPCOM"},{code:"CQT",fullname_vi:"CTCP Xi măng Quán Triều VVMI",type:1,san:"UPCOM"},{code:"CRC",fullname_vi:"CTCP Create Capital Việt Nam",type:1,san:"HOSE"},{code:"CRE",fullname_vi:"CTCP Bất động sản Thế Kỷ",type:1,san:"HOSE"},{code:"CSC",fullname_vi:"CTCP Tập đoàn COTANA",type:1,san:"HNX"},{code:"CSM",fullname_vi:"CTCP Công nghiệp Cao su Miền Nam",type:1,san:"HOSE"},{code:"CST",fullname_vi:"CTCP Than Cao Sơn - TKV",type:1,san:"UPCOM"},{code:"CSV",fullname_vi:"CTCP Hóa chất Cơ bản Miền Nam",type:1,san:"HOSE"},{code:"CT3",fullname_vi:"CTCP Đầu tư và Xây dựng Công trình 3",type:1,san:"UPCOM"},{code:"CT6",fullname_vi:"CTCP Công trình 6",type:1,san:"UPCOM"},{code:"CTA",fullname_vi:"CTCP Vinavico",type:1,san:"UPCOM"},{code:"CTB",fullname_vi:"CTCP Chế tạo Bơm Hải Dương",type:1,san:"HNX"},{code:"CTC",fullname_vi:"CTCP Tập đoàn Hoàng Kim Tây Nguyên",type:1,san:"HNX"},{code:"CTD",fullname_vi:"CTCP Xây dựng Coteccons",type:1,san:"HOSE"},{code:"CTF",fullname_vi:"CTCP City Auto",type:1,san:"HOSE"},{code:"CTI",fullname_vi:"CTCP Đầu tư Phát triển Cường Thuận IDICO",type:1,san:"HOSE"},{code:"CTN",fullname_vi:"CTCP Xây dựng Công trình ngầm",type:1,san:"UPCOM"},{code:"CTP",fullname_vi:"CTCP Minh Khang Capital Trading Public",type:1,san:"HNX"},{code:"CTR",fullname_vi:"Tổng CTCP Công trình Viettel",type:1,san:"HOSE"},{code:"CTT",fullname_vi:"CTCP Chế tạo Máy - Vinacomin",type:1,san:"HNX"},{code:"CTW",fullname_vi:"CTCP Cấp thoát nước Cần Thơ",type:1,san:"UPCOM"},{code:"CTX",fullname_vi:"Tổng CTCP Đầu tư Xây dựng và Thương mại Việt Nam",type:1,san:"UPCOM"},{code:"CVN",fullname_vi:"CTCP Vinam",type:1,san:"HNX"},{code:"CVT",fullname_vi:"CTCP CMC",type:1,san:"HOSE"},{code:"CX8",fullname_vi:"CTCP Đầu tư và Xây lắp Constrexim Số 8",type:1,san:"HNX"},{code:"CYC",fullname_vi:"CTCP Gạch men Chang Yih",type:1,san:"UPCOM"},{code:"D11",fullname_vi:"CTCP Địa ốc 11",type:1,san:"HNX"},{code:"D2D",fullname_vi:"CTCP Phát triển Đô thị Công nghiệp số 2",type:1,san:"HOSE"},{code:"DAC",fullname_vi:"CTCP 382 Đông Anh",type:1,san:"UPCOM"},{code:"DAD",fullname_vi:"CTCP Đầu tư và Phát triển Giáo dục Đà Nẵng",type:1,san:"HNX"},{code:"DAE",fullname_vi:"CTCP Sách Giáo dục tại Thành phố Đà Nẵng",type:1,san:"HNX"},{code:"DAG",fullname_vi:"CTCP Tập đoàn Nhựa Đông Á",type:1,san:"HOSE"},{code:"DAH",fullname_vi:"CTCP Tập đoàn Khách sạn Đông Á",type:1,san:"HOSE"},{code:"DAN",fullname_vi:"CTCP Dược Danapha",type:1,san:"UPCOM"},{code:"DAS",fullname_vi:"CTCP Máy - Thiết bị Dầu khí Đà Nẵng",type:1,san:"UPCOM"},{code:"DAT",fullname_vi:"CTCP Đầu tư du lịch và Phát triển Thủy sản",type:1,san:"HOSE"},{code:"DBC",fullname_vi:"CTCP Tập đoàn Dabaco Việt Nam",type:1,san:"HOSE"},{code:"DBD",fullname_vi:"CTCP Dược - Trang thiết bị Y tế Bình Định",type:1,san:"HOSE"},{code:"DBM",fullname_vi:"CTCP Dược - Vật tư Y Tế Đăk Lăk",type:1,san:"UPCOM"},{code:"DBT",fullname_vi:"CTCP Dược phẩm Bến Tre",type:1,san:"HOSE"},{code:"DC1",fullname_vi:"CTCP Đầu tư Phát triển Xây dựng Số 1",type:1,san:"UPCOM"},{code:"DC2",fullname_vi:"CTCP Đầu tư - Phát triển - Xây dựng (DIC) Số 2",type:1,san:"HNX"},{code:"DC4",fullname_vi:"CTCP Xây dựng DIC Holdings",type:1,san:"HOSE"},{code:"DCF",fullname_vi:"CTCP Xây dựng và Thiết kế Số 1",type:1,san:"UPCOM"},{code:"DCG",fullname_vi:"CTCP Tổng Công ty May Đáp Cầu",type:1,san:"UPCOM"},{code:"DCH",fullname_vi:"CTCP Địa chính Hà Nội",type:1,san:"UPCOM"},{code:"DCL",fullname_vi:"CTCP Dược phẩm Cửu Long",type:1,san:"HOSE"},{code:"DCM",fullname_vi:"CTCP Phân bón Dầu khí Cà Mau",type:1,san:"HOSE"},{code:"DCR",fullname_vi:"CTCP Gạch men Cosevco",type:1,san:"UPCOM"},{code:"DCS",fullname_vi:"CTCP Tập đoàn Đại Châu",type:1,san:"UPCOM"},{code:"DCT",fullname_vi:"CTCP Tấm lợp Vật liệu Xây dựng Đồng Nai",type:1,san:"UPCOM"},{code:"DDG",fullname_vi:"CTCP Đầu tư Công nghiệp Xuất nhập khẩu Đông Dương",type:1,san:"HNX"},{code:"DDH",fullname_vi:"CTCP Đảm bảo Giao thông Đường thủy Hải Phòng",type:1,san:"UPCOM"},{code:"DDM",fullname_vi:"CTCP Hàng Hải Đông Đô",type:1,san:"UPCOM"},{code:"DDN",fullname_vi:"CTCP Dược và Thiết bị Y tế Đà Nẵng",type:1,san:"UPCOM"},{code:"DDV",fullname_vi:"CTCP DAP - VINACHEM",type:1,san:"UPCOM"},{code:"DFC",fullname_vi:"CTCP Xích líp Đông Anh",type:1,san:"UPCOM"},{code:"DFF",fullname_vi:"CTCP Tập đoàn Đua Fat",type:1,san:"UPCOM"},{code:"DGC",fullname_vi:"CTCP Tập đoàn Hóa chất Đức Giang",type:1,san:"HOSE"},{code:"DGT",fullname_vi:"CTCP Công trình Giao thông Đồng Nai",type:1,san:"UPCOM"},{code:"DGW",fullname_vi:"CTCP Thế Giới Số",type:1,san:"HOSE"},{code:"DHA",fullname_vi:"CTCP Hóa An",type:1,san:"HOSE"},{code:"DHB",fullname_vi:"CTCP Phân đạm và Hóa chất Hà Bắc",type:1,san:"UPCOM"},{code:"DHC",fullname_vi:"CTCP Đông Hải Bến Tre",type:1,san:"HOSE"},{code:"DHD",fullname_vi:"CTCP Dược Vật tư Y tế Hải Dương",type:1,san:"UPCOM"},{code:"DHG",fullname_vi:"CTCP Dược Hậu Giang",type:1,san:"HOSE"},{code:"DHM",fullname_vi:"CTCP Thương mại và Khai thác Khoáng sản Dương Hiếu",type:1,san:"HOSE"},{code:"DHN",fullname_vi:"CTCP Dược phẩm Hà Nội",type:1,san:"UPCOM"},{code:"DHP",fullname_vi:"CTCP Điện cơ Hải Phòng",type:1,san:"HNX"},{code:"DHT",fullname_vi:"CTCP Dược phẩm Hà Tây",type:1,san:"HNX"},{code:"DIC",fullname_vi:"CTCP Đầu tư và Thương mại DIC",type:1,san:"UPCOM"},{code:"DID",fullname_vi:"CTCP DIC - Đồng Tiến",type:1,san:"UPCOM"},{code:"DIG",fullname_vi:"Tổng CTCP Đầu tư Phát triển Xây dựng",type:1,san:"HOSE"},{code:"DIH",fullname_vi:"CTCP Đầu tư Phát triển Xây dựng - Hội An",type:1,san:"HNX"},{code:"DKC",fullname_vi:"CTCP Chợ Lạng Sơn",type:1,san:"UPCOM"},{code:"DL1",fullname_vi:"CTCP Tập đoàn Alpha Seven",type:1,san:"HNX"},{code:"DLD",fullname_vi:"CTCP Du lịch Đắk Lắk",type:1,san:"UPCOM"},{code:"DLG",fullname_vi:"CTCP Tập đoàn Đức Long Gia Lai",type:1,san:"HOSE"},{code:"DLM",fullname_vi:"CTCP Chiếu sáng công cộng Đà Nẵng",type:1,san:""},{code:"DLR",fullname_vi:"CTCP Địa ốc Đà Lạt",type:1,san:"UPCOM"},{code:"DLT",fullname_vi:"CTCP Du lịch và Thương mại - Vinacomin",type:1,san:"UPCOM"},{code:"DM7",fullname_vi:"CTCP Dệt May 7",type:1,san:"UPCOM"},{code:"DMC",fullname_vi:"CTCP Xuất nhập khẩu Y Tế Domesco",type:1,san:"HOSE"},{code:"DMN",fullname_vi:"CTCP Domenal",type:1,san:"UPCOM"},{code:"DMS",fullname_vi:"CTCP Hóa phẩm Dầu khí DMC - Miền Nam",type:1,san:"UPCOM"},{code:"DNA",fullname_vi:"CTCP Điện Nước An Giang",type:1,san:"UPCOM"},{code:"DNC",fullname_vi:"CTCP Điện Nước Lắp máy Hải Phòng",type:1,san:"HNX"},{code:"DND",fullname_vi:"CTCP Đầu tư Xây dựng và Vật liệu Đồng Nai",type:1,san:"UPCOM"},{code:"DNE",fullname_vi:"CTCP Môi trường Đô thị Đà Nẵng",type:1,san:"UPCOM"},{code:"DNH",fullname_vi:"CTCP Thủy điện Đa Nhim - Hàm Thuận - Đa Mi",type:1,san:"UPCOM"},{code:"DNL",fullname_vi:"CTCP Logistics Cảng Đà Nẵng",type:1,san:"UPCOM"},{code:"DNM",fullname_vi:"Tổng CTCP Y tế DANAMECO",type:1,san:"UPCOM"},{code:"DNN",fullname_vi:"CTCP Cấp nước Đà Nẵng",type:1,san:"UPCOM"},{code:"DNP",fullname_vi:"CTCP DNP Holding",type:1,san:"HNX"},{code:"DNT",fullname_vi:"CTCP Du lịch Đồng Nai",type:1,san:"UPCOM"},{code:"DNW",fullname_vi:"CTCP Cấp nước Đồng Nai",type:1,san:"UPCOM"},{code:"DOC",fullname_vi:"CTCP Vật tư Nông Nghiệp Đồng Nai",type:1,san:"UPCOM"},{code:"DOP",fullname_vi:"CTCP Vận tải Xăng dầu Đồng Tháp",type:1,san:"UPCOM"},{code:"DP1",fullname_vi:"CTCP Dược phẩm Trung ương CPC1",type:1,san:"UPCOM"},{code:"DP2",fullname_vi:"CTCP Dược phẩm Trung ương 2",type:1,san:"UPCOM"},{code:"DP3",fullname_vi:"CTCP Dược phẩm Trung ương 3",type:1,san:"HNX"},{code:"DPC",fullname_vi:"CTCP Nhựa Đà Nẵng",type:1,san:"HNX"},{code:"DPG",fullname_vi:"CTCP Tập đoàn Đạt Phương",type:1,san:"HOSE"},{code:"DPH",fullname_vi:"CTCP Dược phẩm Hải Phòng",type:1,san:"UPCOM"},{code:"DPM",fullname_vi:"Tổng Công ty Phân bón và Hóa chất Dầu khí - CTCP",type:1,san:"HOSE"},{code:"DPP",fullname_vi:"CTCP Dược Đồng Nai",type:1,san:"UPCOM"},{code:"DPR",fullname_vi:"CTCP Cao su Đồng Phú",type:1,san:"HOSE"},{code:"DPS",fullname_vi:"CTCP Đầu tư Phát triển Sóc Sơn",type:1,san:"UPCOM"},{code:"DQC",fullname_vi:"CTCP Tập đoàn Điện Quang",type:1,san:"HOSE"},{code:"DRC",fullname_vi:"CTCP Cao su Đà Nẵng",type:1,san:"HOSE"},{code:"DRG",fullname_vi:"CTCP Cao su Đắk Lắk",type:1,san:"UPCOM"},{code:"DRH",fullname_vi:"CTCP DRH Holdings",type:1,san:"HOSE"},{code:"DRI",fullname_vi:"CTCP Đầu tư Cao su Đắk Lắk",type:1,san:"UPCOM"},{code:"DRL",fullname_vi:"CTCP Thủy điện - Điện Lực 3",type:1,san:"HOSE"},{code:"DS3",fullname_vi:"CTCP DS3",type:1,san:"HNX"},{code:"DSD",fullname_vi:"CTCP DHC Suối Đôi",type:1,san:"UPCOM"},{code:"DSG",fullname_vi:"CTCP Kính Đáp Cầu",type:1,san:"UPCOM"},{code:"DSN",fullname_vi:"CTCP Công viên nước Đầm Sen",type:1,san:"HOSE"},{code:"DSP",fullname_vi:"CTCP Dịch vụ Du lịch Phú Thọ",type:1,san:"UPCOM"},{code:"DST",fullname_vi:"CTCP Đầu tư Sao Thăng Long",type:1,san:"HNX"},{code:"DSV",fullname_vi:"CTCP Đường sắt Vĩnh Phú",type:1,san:"UPCOM"},{code:"DTA",fullname_vi:"CTCP Đệ Tam",type:1,san:"HOSE"},{code:"DTB",fullname_vi:"CTCP Công trình Đô thị Bảo Lộc",type:1,san:"UPCOM"},{code:"DTC",fullname_vi:"CTCP Viglacera Đông Triều",type:1,san:"HNX"},{code:"DTD",fullname_vi:"CTCP Đầu tư Phát triển Thành Đạt",type:1,san:"HNX"},{code:"DTE",fullname_vi:"CTCP Đầu tư Năng lượng Đại Trường Thành Holdings",type:1,san:"UPCOM"},{code:"DTG",fullname_vi:"CTCP Dược phẩm Tipharco",type:1,san:"HNX"},{code:"DTH",fullname_vi:"CTCP Dược Vật tư Y Tế Thanh Hóa",type:1,san:"UPCOM"},{code:"DTI",fullname_vi:"CTCP Đầu tư Đức Trung",type:1,san:"UPCOM"},{code:"DTK",fullname_vi:"Tổng Công ty Điện lực TKV - CTCP",type:1,san:"HNX"},{code:"DTL",fullname_vi:"CTCP Đại Thiên Lộc",type:1,san:"HOSE"},{code:"DTP",fullname_vi:"CTCP Dược phẩm CPC1 Hà Nội",type:1,san:"UPCOM"},{code:"DTT",fullname_vi:"CTCP Kỹ nghệ Đô Thành",type:1,san:"HOSE"},{code:"DTV",fullname_vi:"CTCP Phát triển Điện Trà Vinh",type:1,san:"UPCOM"},{code:"DUS",fullname_vi:"CTCP Dịch vụ Đô thị Đà Lạt",type:1,san:"UPCOM"},{code:"DVC",fullname_vi:"CTCP Thương mại Dịch vụ Tổng hợp Cảng Hải Phòng",type:1,san:"UPCOM"},{code:"DVG",fullname_vi:"CTCP Tập đoàn Sơn Đại Việt",type:1,san:"HNX"},{code:"DVM",fullname_vi:"CTCP Dược liệu Việt Nam",type:1,san:"HNX"},{code:"DVN",fullname_vi:"Tổng Công ty Dược Việt Nam - CTCP",type:1,san:"UPCOM"},{code:"DVP",fullname_vi:"CTCP Đầu tư và Phát triển Cảng Đình Vũ",type:1,san:"HOSE"},{code:"DVW",fullname_vi:"CTCP Dịch vụ và Xây dựng Cấp nước Đồng Nai",type:1,san:"UPCOM"},{code:"DWC",fullname_vi:"CTCP Cấp nước Đắk Lắk",type:1,san:"UPCOM"},{code:"DWS",fullname_vi:"CTCP Cấp nước và Môi trường đô thị Đồng Tháp",type:1,san:"UPCOM"},{code:"DXG",fullname_vi:"CTCP Tập đoàn Đất Xanh",type:1,san:"HOSE"},{code:"DXL",fullname_vi:"CTCP Du Lịch và Xuất nhập khẩu Lạng Sơn",type:1,san:"UPCOM"},{code:"DXP",fullname_vi:"CTCP Cảng Đoạn Xá",type:1,san:"HNX"},{code:"DXS",fullname_vi:"CTCP Dịch vụ Bất động sản Đất Xanh",type:1,san:"HOSE"},{code:"DXV",fullname_vi:"CTCP VICEM Vật liệu Xây dựng Đà Nẵng",type:1,san:"HOSE"},{code:"DZM",fullname_vi:"CTCP Cơ điện Dzĩ An",type:1,san:"UPCOM"},{code:"E12",fullname_vi:"CTCP Xây dựng Điện VNECO12",type:1,san:"UPCOM"},{code:"E29",fullname_vi:"CTCP Đầu tư Xây dựng và Kỹ thuật 29",type:1,san:"UPCOM"},{code:"EBS",fullname_vi:"CTCP Sách Giáo dục tại Thành phố Hà Nội",type:1,san:"HNX"},{code:"ECI",fullname_vi:"CTCP Tập Đoàn ECI",type:1,san:"HNX"},{code:"EFI",fullname_vi:"CTCP Đầu tư Tài chính Giáo dục",type:1,san:"UPCOM"},{code:"EIC",fullname_vi:"CTCP EVN Quốc tế",type:1,san:"UPCOM"},{code:"EID",fullname_vi:"CTCP Đầu tư và Phát triển Giáo dục Hà Nội",type:1,san:"HNX"},{code:"EIN",fullname_vi:"CTCP Đầu tư - Thương mại - Dịch vụ Điện Lực",type:1,san:"UPCOM"},{code:"ELC",fullname_vi:"CTCP Công Nghệ - Viễn Thông Elcom",type:1,san:"HOSE"},{code:"EME",fullname_vi:"CTCP Điện cơ",type:1,san:"UPCOM"},{code:"EMG",fullname_vi:"CTCP Thiết bị Phụ Tùng Cơ Điện",type:1,san:"UPCOM"},{code:"EMS",fullname_vi:"Tổng Công ty Chuyển phát nhanh Bưu Điện - CTCP",type:1,san:"UPCOM"},{code:"EPC",fullname_vi:"CTCP Cà phê Ea Pốk",type:1,san:"UPCOM"},{code:"EPH",fullname_vi:"CTCP Dịch vụ Xuất bản Giáo dục Hà Nội",type:1,san:"UPCOM"},{code:"EVE",fullname_vi:"CTCP Everpia",type:1,san:"HOSE"},{code:"EVG",fullname_vi:"CTCP Tập đoàn EverLand",type:1,san:"HOSE"},{code:"FBA",fullname_vi:"CTCP Tập đoàn Quốc tế FBA",type:1,san:"UPCOM"},{code:"FBC",fullname_vi:"CTCP Cơ khí Phổ Yên",type:1,san:"UPCOM"},{code:"FCC",fullname_vi:"CTCP Liên hợp Thực phẩm",type:1,san:"UPCOM"},{code:"FCM",fullname_vi:"CTCP Khoáng sản FECON",type:1,san:"HOSE"},{code:"FCN",fullname_vi:"CTCP FECON",type:1,san:"HOSE"},{code:"FCS",fullname_vi:"CTCP Lương thực Thành phố Hồ Chí Minh",type:1,san:"UPCOM"},{code:"FDC",fullname_vi:"CTCP Ngoại thương và Phát triển Đầu tư Thành phố Hồ Chí Minh",type:1,san:"HOSE"},{code:"FGL",fullname_vi:"CTCP Cà phê Gia Lai",type:1,san:"UPCOM"},{code:"FHN",fullname_vi:"CTCP Xuất nhập khẩu Lương thực Thực phẩm Hà Nội",type:1,san:"UPCOM"},{code:"FHS",fullname_vi:"CTCP Phát hành Sách Thành phố Hồ Chí Minh",type:1,san:"UPCOM"},{code:"FIC",fullname_vi:"Tổng Công ty Vật liệu Xây dựng số 1 - CTCP",type:1,san:"UPCOM"},{code:"FID",fullname_vi:"CTCP Đầu tư và Phát triển Doanh nghiệp Việt Nam",type:1,san:"HNX"},{code:"FIR",fullname_vi:"CTCP Địa ốc First Real",type:1,san:"HOSE"},{code:"FIT",fullname_vi:"CTCP Tập đoàn F.I.T",type:1,san:"HOSE"},{code:"FLC",fullname_vi:"CTCP Tập đoàn FLC",type:1,san:"UPCOM"},{code:"FMC",fullname_vi:"CTCP Thực phẩm Sao Ta",type:1,san:"HOSE"},{code:"FOC",fullname_vi:"CTCP Dịch vụ Trực tuyến FPT",type:1,san:"UPCOM"},{code:"FOX",fullname_vi:"CTCP Viễn thông FPT",type:1,san:"UPCOM"},{code:"FPT",fullname_vi:"CTCP FPT",type:1,san:"HOSE"},{code:"FRC",fullname_vi:"CTCP Lâm đặc sản Xuất khẩu Quảng Nam",type:1,san:"UPCOM"},{code:"FRM",fullname_vi:"CTCP Lâm Nghiệp Sài Gòn",type:1,san:"UPCOM"},{code:"FRT",fullname_vi:"CTCP Bán lẻ Kỹ thuật số FPT",type:1,san:"HOSE"},{code:"FSO",fullname_vi:"CTCP Cơ khí đóng tàu Thủy sản Việt Nam",type:1,san:"UPCOM"},{code:"FT1",fullname_vi:"CTCP Phụ tùng Máy số 1",type:1,san:"UPCOM"},{code:"FTI",fullname_vi:"CTCP Công nghiệp - Thương mại Hữu Nghị",type:1,san:"UPCOM"},{code:"FTM",fullname_vi:"CTCP Đầu tư và Phát triển Đức Quân",type:1,san:"UPCOM"},{code:"G20",fullname_vi:"CTCP Đầu tư Dệt may Vĩnh Phúc",type:1,san:"UPCOM"},{code:"G36",fullname_vi:"Tổng Công ty 36 - CTCP",type:1,san:"UPCOM"},{code:"GAB",fullname_vi:"CTCP Đầu tư Khai Khoáng và Quản lý Tài sản FLC",type:1,san:"UPCOM"},{code:"GAS",fullname_vi:"Tổng Công ty Khí Việt Nam - CTCP",type:1,san:"HOSE"},{code:"GCB",fullname_vi:"CTCP Petec Bình Định",type:1,san:"UPCOM"},{code:"GCF",fullname_vi:"CTCP Thực phẩm G.C",type:1,san:"UPCOM"},{code:"GDT",fullname_vi:"CTCP Chế biến Gỗ Đức Thành",type:1,san:"HOSE"},{code:"GDW",fullname_vi:"CTCP Cấp nước Gia Định",type:1,san:"HNX"},{code:"GEE",fullname_vi:"CTCP Thiết bị điện Gelex",type:1,san:"UPCOM"},{code:"GEG",fullname_vi:"CTCP Điện Gia Lai",type:1,san:"HOSE"},{code:"GER",fullname_vi:"CTCP Thể thao Ngôi sao Geru",type:1,san:"UPCOM"},{code:"GEX",fullname_vi:"CTCP Tập đoàn GELEX",type:1,san:"HOSE"},{code:"GGG",fullname_vi:"CTCP Ô tô Giải Phóng",type:1,san:"UPCOM"},{code:"GH3",fullname_vi:"CTCP Công trình Giao thông Hà Nội",type:1,san:"UPCOM"},{code:"GHC",fullname_vi:"CTCP Thủy điện Gia Lai",type:1,san:"UPCOM"},{code:"GIC",fullname_vi:"CTCP Đầu tư Dịch vụ và Phát triển Xanh",type:1,san:"HNX"},{code:"GIL",fullname_vi:"CTCP Sản xuất Kinh doanh và Xuất nhập khẩu Bình Thạnh",type:1,san:"HOSE"},{code:"GKM",fullname_vi:"CTCP Khang Minh Group",type:1,san:"HNX"},{code:"GLC",fullname_vi:"CTCP Vàng Lào Cai",type:1,san:"UPCOM"},{code:"GLT",fullname_vi:"CTCP Kỹ thuật Điện Toàn cầu",type:1,san:"HNX"},{code:"GLW",fullname_vi:"CTCP Cấp thoát nước Gia Lai",type:1,san:"UPCOM"},{code:"GMA",fullname_vi:"CTCP Enteco Việt Nam",type:1,san:"HNX"},{code:"GMC",fullname_vi:"CTCP Garmex Sài Gòn",type:1,san:"HOSE"},{code:"GMD",fullname_vi:"CTCP Gemadept",type:1,san:"HOSE"},{code:"GMH",fullname_vi:"CTCP Minh Hưng Quảng Trị",type:1,san:"HOSE"},{code:"GMX",fullname_vi:"CTCP Gạch ngói Gốm Xây dựng Mỹ Xuân",type:1,san:"HNX"},{code:"GND",fullname_vi:"CTCP Gạch ngói Đồng Nai",type:1,san:"UPCOM"},{code:"GPC",fullname_vi:"CTCP Tập đoàn Green+",type:1,san:"UPCOM"},{code:"GSM",fullname_vi:"CTCP Thủy điện Hương Sơn",type:1,san:"UPCOM"},{code:"GSP",fullname_vi:"CTCP Vận tải Sản Phẩm Khí Quốc tế",type:1,san:"HOSE"},{code:"GTA",fullname_vi:"CTCP Chế biến gỗ Thuận An",type:1,san:"HOSE"},{code:"GTD",fullname_vi:"CTCP Giầy Thượng Đình",type:1,san:"UPCOM"},{code:"GTS",fullname_vi:"CTCP Công trình Giao thông Sài Gòn",type:1,san:"UPCOM"},{code:"GTT",fullname_vi:"CTCP Thuận Thảo",type:1,san:"UPCOM"},{code:"GVR",fullname_vi:"Tập đoàn Công nghiệp Cao su Việt Nam - CTCP",type:1,san:"HOSE"},{code:"GVT",fullname_vi:"CTCP Giấy Việt Trì",type:1,san:"UPCOM"},{code:"H11",fullname_vi:"CTCP Xây dựng HUD101",type:1,san:"UPCOM"},{code:"HAD",fullname_vi:"CTCP Bia Hà Nội - Hải Dương",type:1,san:"HNX"},{code:"HAF",fullname_vi:"CTCP Thực phẩm Hà Nội",type:1,san:"UPCOM"},{code:"HAG",fullname_vi:"CTCP Hoàng Anh Gia Lai",type:1,san:"HOSE"},{code:"HAH",fullname_vi:"CTCP Vận tải và Xếp dỡ Hải An",type:1,san:"HOSE"},{code:"HAI",fullname_vi:"CTCP Nông dược H.A.I",type:1,san:"UPCOM"},{code:"HAM",fullname_vi:"CTCP Vật tư Hậu Giang",type:1,san:"UPCOM"},{code:"HAN",fullname_vi:"Tổng Công ty Xây dựng Hà Nội - CTCP",type:1,san:"UPCOM"},{code:"HAP",fullname_vi:"CTCP Tập đoàn Hapaco",type:1,san:"HOSE"},{code:"HAR",fullname_vi:"CTCP Đầu tư Thương mại Bất động sản An Dương Thảo Điền",type:1,san:"HOSE"},{code:"HAS",fullname_vi:"CTCP Hacisco",type:1,san:"HOSE"},{code:"HAT",fullname_vi:"CTCP Thương mại Bia Hà Nội",type:1,san:"HNX"},{code:"HAV",fullname_vi:"CTCP Rượu Hapro",type:1,san:"UPCOM"},{code:"HAX",fullname_vi:"CTCP Dịch vụ Ô tô Hàng Xanh",type:1,san:"HOSE"},{code:"HBC",fullname_vi:"CTCP Tập đoàn Xây dựng Hòa Bình",type:1,san:"HOSE"},{code:"HBD",fullname_vi:"CTCP Bao Bì PP Bình Dương",type:1,san:"UPCOM"},{code:"HBH",fullname_vi:"CTCP Habeco - Hải Phòng",type:1,san:"UPCOM"},{code:"HC1",fullname_vi:"CTCP Xây dựng Số 1 Hà Nội",type:1,san:"UPCOM"},{code:"HC3",fullname_vi:"CTCP Xây dựng Số 3 Hải Phòng",type:1,san:"UPCOM"},{code:"HCB",fullname_vi:"CTCP Dệt may 29/3",type:1,san:"UPCOM"},{code:"HCC",fullname_vi:"CTCP Bê tông Hòa Cầm - Intimex",type:1,san:"HNX"},{code:"HCD",fullname_vi:"CTCP Đầu tư Sản xuất và Thương mại HCD",type:1,san:"HOSE"},{code:"HCI",fullname_vi:"CTCP Đầu tư Xây dựng Hà Nội",type:1,san:"UPCOM"},{code:"HCT",fullname_vi:"CTCP Thương mại Dịch vụ Vận tải Xi măng Hải Phòng",type:1,san:"HNX"},{code:"HD2",fullname_vi:"CTCP Đầu tư Phát triển Nhà HUD2",type:1,san:"UPCOM"},{code:"HD6",fullname_vi:"CTCP Đầu tư và Phát triển Nhà Số 6 Hà Nội",type:1,san:"UPCOM"},{code:"HD8",fullname_vi:"CTCP Đầu tư Phát triển Nhà và Đô thị HUD8",type:1,san:"UPCOM"},{code:"HDA",fullname_vi:"CTCP Hãng sơn Đông Á",type:1,san:"HNX"},{code:"HDC",fullname_vi:"CTCP Phát triển Nhà Bà Rịa - Vũng Tàu",type:1,san:"HOSE"},{code:"HDG",fullname_vi:"CTCP Tập đoàn Hà Đô",type:1,san:"HOSE"},{code:"HDM",fullname_vi:"CTCP Dệt may Huế",type:1,san:"UPCOM"},{code:"HDO",fullname_vi:"CTCP Hưng Đạo Container",type:1,san:"UPCOM"},{code:"HDP",fullname_vi:"CTCP Dược Hà Tĩnh",type:1,san:"UPCOM"},{code:"HDW",fullname_vi:"CTCP Kinh doanh Nước sạch Hải Dương",type:1,san:"UPCOM"},{code:"HEC",fullname_vi:"CTCP Tư vấn Xây dựng Thủy Lợi II",type:1,san:"UPCOM"},{code:"HEJ",fullname_vi:"Tổng Công ty Tư vấn Xây dựng Thủy lợi Việt Nam - CTCP",type:1,san:"UPCOM"},{code:"HEM",fullname_vi:"CTCP Chế tạo Điện Cơ Hà Nội",type:1,san:"UPCOM"},{code:"HEP",fullname_vi:"CTCP Môi trường và Công trình Đô thị Huế",type:1,san:"UPCOM"},{code:"HES",fullname_vi:"CTCP Dịch vụ Giải trí Hà Nội",type:1,san:"UPCOM"},{code:"HEV",fullname_vi:"CTCP Sách Đại học Dạy nghề",type:1,san:"HNX"},{code:"HFB",fullname_vi:"CTCP Công trình Cầu phà Thành phố Hồ Chí Minh",type:1,san:"UPCOM"},{code:"HFC",fullname_vi:"CTCP Xăng dầu HFC",type:1,san:"UPCOM"},{code:"HFX",fullname_vi:"CTCP Sản xuất - Xuất nhập khẩu Thanh Hà",type:1,san:"UPCOM"},{code:"HGM",fullname_vi:"CTCP Cơ khí và Khoáng sản Hà Giang",type:1,san:"HNX"},{code:"HGT",fullname_vi:"CTCP Du lịch Hương Giang",type:1,san:"UPCOM"},{code:"HGW",fullname_vi:"CTCP Cấp thoát nước - Công trình Đô thị Hậu Giang",type:1,san:"UPCOM"},{code:"HHC",fullname_vi:"CTCP Bánh kẹo Hải Hà",type:1,san:"HNX"},{code:"HHG",fullname_vi:"CTCP Hoàng Hà",type:1,san:"UPCOM"},{code:"HHN",fullname_vi:"CTCP Vận tải và Dịch vụ Hàng hóa Hà Nội",type:1,san:"UPCOM"},{code:"HHP",fullname_vi:"CTCP HHP Global",type:1,san:"HOSE"},{code:"HHR",fullname_vi:"CTCP Đường sắt Hà Hải",type:1,san:"UPCOM"},{code:"HHS",fullname_vi:"CTCP Đầu tư Dịch vụ Hoàng Huy",type:1,san:"HOSE"},{code:"HHV",fullname_vi:"CTCP Đầu tư Hạ tầng Giao thông Đèo Cả",type:1,san:"HOSE"},{code:"HID",fullname_vi:"CTCP Halcom Việt Nam",type:1,san:"HOSE"},{code:"HIG",fullname_vi:"CTCP Tập đoàn HIPT",type:1,san:"UPCOM"},{code:"HII",fullname_vi:"CTCP An Tiến Industries",type:1,san:"HOSE"},{code:"HJC",fullname_vi:"CTCP Hòa Việt",type:1,san:"UPCOM"},{code:"HJS",fullname_vi:"CTCP Thủy điện Nậm Mu",type:1,san:"HNX"},{code:"HKB",fullname_vi:"CTCP Nông nghiệp và Thực phẩm Hà Nội - Kinh Bắc",type:1,san:"UPCOM"},{code:"HKP",fullname_vi:"CTCP Bao bì Hà Tiên",type:1,san:""},{code:"HKT",fullname_vi:"CTCP Đầu tư Ego Việt Nam",type:1,san:"HNX"},{code:"HLA",fullname_vi:"CTCP Hữu Liên Á Châu",type:1,san:"UPCOM"},{code:"HLB",fullname_vi:"CTCP Bia và Nước giải khát Hạ Long",type:1,san:"UPCOM"},{code:"HLC",fullname_vi:"CTCP Than Hà Lầm - Vinacomin",type:1,san:"HNX"},{code:"HLD",fullname_vi:"CTCP Đầu tư và Phát triển Bất động sản HUDLAND",type:1,san:"HNX"},{code:"HLG",fullname_vi:"CTCP Tập đoàn Hoàng Long",type:1,san:""},{code:"HLR",fullname_vi:"CTCP Đường sắt Hà Lạng",type:1,san:"UPCOM"},{code:"HLS",fullname_vi:"CTCP Sứ Kỹ thuật Hoàng Liên Sơn",type:1,san:"UPCOM"},{code:"HLT",fullname_vi:"CTCP Dệt may Hoàng Thị Loan",type:1,san:"UPCOM"},{code:"HLY",fullname_vi:"CTCP Viglacera Hạ Long I",type:1,san:"UPCOM"},{code:"HMC",fullname_vi:"CTCP Kim khí Thành phố Hồ Chí Minh",type:1,san:"HOSE"},{code:"HMG",fullname_vi:"CTCP Kim khí Hà Nội - VNSTEEL",type:1,san:"UPCOM"},{code:"HMH",fullname_vi:"CTCP Hải Minh",type:1,san:"HNX"},{code:"HMR",fullname_vi:"CTCP Đá Hoàng Mai",type:1,san:"HNX"},{code:"HMS",fullname_vi:"CTCP Xây dựng Bảo tàng Hồ Chí Minh",type:1,san:"UPCOM"},{code:"HNA",fullname_vi:"CTCP Thủy điện Hủa Na",type:1,san:"HOSE"},{code:"HNB",fullname_vi:"CTCP Bến xe Hà Nội",type:1,san:"UPCOM"},{code:"HND",fullname_vi:"CTCP Nhiệt điện Hải Phòng",type:1,san:"UPCOM"},{code:"HNF",fullname_vi:"CTCP Thực phẩm Hữu Nghị",type:1,san:"UPCOM"},{code:"HNG",fullname_vi:"CTCP Nông nghiệp Quốc tế Hoàng Anh Gia Lai",type:1,san:"HOSE"},{code:"HNI",fullname_vi:"CTCP May Hữu Nghị",type:1,san:"UPCOM"},{code:"HNM",fullname_vi:"CTCP Sữa Hà Nội",type:1,san:"UPCOM"},{code:"HNP",fullname_vi:"CTCP Hanel Xốp nhựa",type:1,san:"UPCOM"},{code:"HNR",fullname_vi:"CTCP Rượu và Nước giải khát Hà Nội",type:1,san:"UPCOM"},{code:"HOM",fullname_vi:"CTCP Xi măng VICEM Hoàng Mai",type:1,san:"HNX"},{code:"HOT",fullname_vi:"CTCP Du lịch Dịch vụ Hội An",type:1,san:"UPCOM"},{code:"HPB",fullname_vi:"CTCP Bao bì PP",type:1,san:"UPCOM"},{code:"HPD",fullname_vi:"CTCP Thủy điện ĐăK Đoa",type:1,san:"UPCOM"},{code:"HPG",fullname_vi:"CTCP Tập đoàn Hòa Phát",type:1,san:"HOSE"},{code:"HPH",fullname_vi:"CTCP Hóa Chất Hưng Phát Hà Bắc",type:1,san:"UPCOM"},{code:"HPI",fullname_vi:"CTCP Khu công nghiệp Hiệp Phước",type:1,san:"UPCOM"},{code:"HPM",fullname_vi:"CTCP Xây dựng Thương mại và Khoáng Sản Hoàng Phúc",type:1,san:"UPCOM"},{code:"HPP",fullname_vi:"CTCP Sơn Hải Phòng",type:1,san:"UPCOM"},{code:"HPT",fullname_vi:"CTCP Dịch vụ Công nghệ Tin học HPT",type:1,san:"UPCOM"},{code:"HPW",fullname_vi:"CTCP Cấp nước Hải Phòng",type:1,san:"UPCOM"},{code:"HPX",fullname_vi:"CTCP Đầu tư Hải Phát",type:1,san:"HOSE"},{code:"HQC",fullname_vi:"CTCP Tư vấn Thương mại Dịch vụ Địa Ốc Hoàng Quân",type:1,san:"HOSE"},{code:"HRB",fullname_vi:"CTCP Harec Đầu tư và Thương mại",type:1,san:"UPCOM"},{code:"HRC",fullname_vi:"CTCP Cao su Hòa Bình",type:1,san:"HOSE"},{code:"HRT",fullname_vi:"CTCP Vận tải Đường sắt Hà Nội",type:1,san:"UPCOM"},{code:"HSA",fullname_vi:"CTCP Hestia",type:1,san:"UPCOM"},{code:"HSG",fullname_vi:"CTCP Tập đoàn Hoa Sen",type:1,san:"HOSE"},{code:"HSI",fullname_vi:"CTCP Vật tư Tổng hợp và Phân bón Hóa Sinh",type:1,san:"UPCOM"},{code:"HSL",fullname_vi:"CTCP Đầu tư Phát triển Thực phẩm Hồng Hà",type:1,san:"HOSE"},{code:"HSM",fullname_vi:"Tổng CTCP Dệt may Hà Nội",type:1,san:"UPCOM"},{code:"HSP",fullname_vi:"CTCP Sơn Tổng hợp Hà Nội",type:1,san:"UPCOM"},{code:"HSV",fullname_vi:"CTCP Tập đoàn HSV Việt Nam",type:1,san:"UPCOM"},{code:"HT1",fullname_vi:"CTCP Xi Măng Vicem Hà Tiên",type:1,san:"HOSE"},{code:"HTC",fullname_vi:"CTCP Thương mại Hóc Môn",type:1,san:"HNX"},{code:"HTE",fullname_vi:"CTCP Đầu tư Kinh doanh Điện lực Thành phố Hồ Chí Minh",type:1,san:"UPCOM"},{code:"HTG",fullname_vi:"Tổng CTCP Dệt may Hòa Thọ",type:1,san:"HOSE"},{code:"HTI",fullname_vi:"CTCP Đầu tư Phát triển Hạ tầng IDICO",type:1,san:"HOSE"},{code:"HTL",fullname_vi:"CTCP Kỹ thuật và Ôtô Trường Long",type:1,san:"HOSE"},{code:"HTM",fullname_vi:"Tổng Công ty Thương mại Hà Nội - CTCP",type:1,san:"UPCOM"},{code:"HTN",fullname_vi:"CTCP Hưng Thịnh Incons",type:1,san:"HOSE"},{code:"HTP",fullname_vi:"CTCP In Sách Giáo khoa Hòa Phát",type:1,san:"HNX"},{code:"HTR",fullname_vi:"CTCP Đường sắt Hà Thái",type:1,san:""},{code:"HTT",fullname_vi:"CTCP Thương mại Hà Tây",type:1,san:"UPCOM"},{code:"HTV",fullname_vi:"CTCP Logistics Vicem",type:1,san:"HOSE"},{code:"HTW",fullname_vi:"CTCP Cấp nước Hà Tĩnh",type:1,san:""},{code:"HU1",fullname_vi:"CTCP Đầu tư và Xây dựng HUD1",type:1,san:"HOSE"},{code:"HU3",fullname_vi:"CTCP Đầu tư và Xây dựng HUD3",type:1,san:"UPCOM"},{code:"HU4",fullname_vi:"CTCP Đầu tư và Xây dựng HUD4",type:1,san:"UPCOM"},{code:"HU6",fullname_vi:"CTCP Đầu tư Phát triển Nhà và Đô thị HUD6",type:1,san:"UPCOM"},{code:"HUB",fullname_vi:"CTCP Xây lắp Thừa Thiên Huế",type:1,san:"HOSE"},{code:"HUG",fullname_vi:"Tổng Công ty May Hưng Yên - CTCP",type:1,san:"UPCOM"},{code:"HUT",fullname_vi:"CTCP Tasco",type:1,san:"HNX"},{code:"HVA",fullname_vi:"CTCP Đầu tư HVA",type:1,san:"UPCOM"},{code:"HVG",fullname_vi:"CTCP Hùng Vương",type:1,san:"UPCOM"},{code:"HVH",fullname_vi:"CTCP Đầu tư và Công nghệ HVC",type:1,san:"HOSE"},{code:"HVN",fullname_vi:"Tổng Công ty Hàng không Việt Nam - CTCP",type:1,san:"HOSE"},{code:"HVT",fullname_vi:"CTCP Hóa chất Việt Trì",type:1,san:"HNX"},{code:"HVX",fullname_vi:"CTCP Xi măng VICEM Hải Vân",type:1,san:"HOSE"},{code:"HWS",fullname_vi:"CTCP Cấp nước Thừa Thiên Huế",type:1,san:"UPCOM"},{code:"IBC",fullname_vi:"CTCP Đầu tư Apax Holdings",type:1,san:"UPCOM"},{code:"IBD",fullname_vi:"CTCP In Tổng hợp Bình Dương",type:1,san:"UPCOM"},{code:"ICC",fullname_vi:"CTCP Xây dựng Công nghiệp (ICC)",type:1,san:"UPCOM"},{code:"ICF",fullname_vi:"CTCP Đầu tư Thương mại Thủy sản",type:1,san:"UPCOM"},{code:"ICG",fullname_vi:"CTCP Xây dựng Sông Hồng",type:1,san:"HNX"},{code:"ICI",fullname_vi:"CTCP Đầu tư và Xây dựng Công nghiệp",type:1,san:"UPCOM"},{code:"ICN",fullname_vi:"CTCP Đầu tư Xây dựng Dầu khí IDICO",type:1,san:"UPCOM"},{code:"ICT",fullname_vi:"CTCP Viễn thông - Tin học Bưu điện",type:1,san:"HOSE"},{code:"IDC",fullname_vi:"Tổng Công ty IDICO – CTCP",type:1,san:"HNX"},{code:"IDI",fullname_vi:"CTCP Đầu tư và Phát triển Đa Quốc Gia",type:1,san:"HOSE"},{code:"IDJ",fullname_vi:"CTCP Đầu tư IDJ Việt Nam",type:1,san:"HNX"},{code:"IDP",fullname_vi:"CTCP Sữa Quốc tế",type:1,san:"UPCOM"},{code:"IDV",fullname_vi:"CTCP Phát triển Hạ tầng Vĩnh Phúc",type:1,san:"HNX"},{code:"IFS",fullname_vi:"CTCP Thực phẩm Quốc tế",type:1,san:"UPCOM"},{code:"IHK",fullname_vi:"CTCP In Hàng Không",type:1,san:"UPCOM"},{code:"IJC",fullname_vi:"CTCP Phát triển Hạ tầng Kỹ thuật",type:1,san:"HOSE"},{code:"ILA",fullname_vi:"CTCP ILA",type:1,san:"UPCOM"},{code:"ILB",fullname_vi:"CTCP ICD Tân Cảng - Long Bình",type:1,san:"HOSE"},{code:"ILC",fullname_vi:"CTCP Hợp tác Lao động với nước ngoài",type:1,san:"UPCOM"},{code:"ILS",fullname_vi:"CTCP Đầu tư Thương mại và Dịch vụ Quốc tế",type:1,san:"UPCOM"},{code:"IME",fullname_vi:"CTCP Cơ khí và Xây lắp Công nghiệp",type:1,san:"UPCOM"},{code:"IMP",fullname_vi:"CTCP Dược phẩm Imexpharm",type:1,san:"HOSE"},{code:"IN4",fullname_vi:"CTCP In Số 4",type:1,san:"UPCOM"},{code:"INC",fullname_vi:"CTCP Tư vấn Đầu tư IDICO",type:1,san:"HNX"},{code:"INN",fullname_vi:"CTCP Bao bì và In Nông nghiệp",type:1,san:"HNX"},{code:"IPA",fullname_vi:"CTCP Tập đoàn Đầu tư I.P.A",type:1,san:"HNX"},{code:"IRC",fullname_vi:"CTCP Cao su Công nghiệp",type:1,san:"UPCOM"},{code:"ISG",fullname_vi:"CTCP Vận tải biển và Hợp tác Lao động Quốc tế",type:1,san:"UPCOM"},{code:"ISH",fullname_vi:"CTCP Thủy điện Srok Phu Miêng IDICO",type:1,san:"UPCOM"},{code:"IST",fullname_vi:"CTCP ICD Tân Cảng Sóng Thần",type:1,san:"UPCOM"},{code:"ITA",fullname_vi:"CTCP Đầu tư và Công nghiệp Tân Tạo",type:1,san:"HOSE"},{code:"ITC",fullname_vi:"CTCP Đầu tư và Kinh doanh Nhà",type:1,san:"HOSE"},{code:"ITD",fullname_vi:"CTCP Công nghệ Tiên Phong",type:1,san:"HOSE"},{code:"ITQ",fullname_vi:"CTCP Tập đoàn Thiên Quang",type:1,san:"HNX"},{code:"ITS",fullname_vi:"CTCP Đầu tư Thương mại và Dịch vụ - Vinacomin",type:1,san:"UPCOM"},{code:"JOS",fullname_vi:"CTCP Chế biến Thủy sản xuất khẩu Minh Hải",type:1,san:"UPCOM"},{code:"JVC",fullname_vi:"CTCP Thiết bị Y tế Việt Nhật",type:1,san:"HOSE"},{code:"KAC",fullname_vi:"CTCP Đầu tư Địa ốc Khang An",type:1,san:"UPCOM"},{code:"KBC",fullname_vi:"Tổng Công ty Phát triển Đô thị Kinh Bắc - CTCP",type:1,san:"HOSE"},{code:"KCB",fullname_vi:"CTCP khoáng Sản và Luyện Kim Cao Bằng",type:1,san:"UPCOM"},{code:"KCE",fullname_vi:"CTCP Bê tông Ly tâm Điện Lực Khánh Hòa",type:1,san:"UPCOM"},{code:"KDC",fullname_vi:"CTCP Tập đoàn KIDO",type:1,san:"HOSE"},{code:"KDH",fullname_vi:"CTCP Đầu tư và Kinh doanh Nhà Khang Điền",type:1,san:"HOSE"},{code:"KDM",fullname_vi:"CTCP Tổng Công ty Phát triển Khu đô thị Dân cư mới",type:1,san:"HNX"},{code:"KGM",fullname_vi:"CTCP Xuất nhập khẩu Kiên Giang",type:1,san:"UPCOM"},{code:"KHA",fullname_vi:"CTCP Đầu tư và Dịch vụ Khánh Hội",type:1,san:""},{code:"KHD",fullname_vi:"CTCP Khai thác Chế biến Khoáng sản Hải Dương",type:1,san:"UPCOM"},{code:"KHG",fullname_vi:"CTCP Tập đoàn Khải Hoàn Land",type:1,san:"HOSE"},{code:"KHL",fullname_vi:"CTCP khoáng Sản và Vật liệu Xây dựng Hưng Long",type:1,san:"UPCOM"},{code:"KHP",fullname_vi:"CTCP Điện lực Khánh Hòa",type:1,san:"HOSE"},{code:"KHS",fullname_vi:"CTCP Kiên Hùng",type:1,san:"HNX"},{code:"KHW",fullname_vi:"CTCP Cấp thoát nước Khánh Hòa",type:1,san:"UPCOM"},{code:"KIP",fullname_vi:"CTCP K.I.P Việt Nam",type:1,san:"UPCOM"},{code:"KKC",fullname_vi:"CTCP Tập Đoàn Thành Thái",type:1,san:"HNX"},{code:"KLF",fullname_vi:"CTCP Đầu tư Thương mại và Xuất nhập khẩu CFS",type:1,san:"UPCOM"},{code:"KLM",fullname_vi:"CTCP Kim loại màu Nghệ Tĩnh",type:1,san:"UPCOM"},{code:"KMR",fullname_vi:"CTCP Mirae",type:1,san:"HOSE"},{code:"KMT",fullname_vi:"CTCP Kim khí Miền Trung",type:1,san:"HNX"},{code:"KOS",fullname_vi:"CTCP KOSY",type:1,san:"HOSE"},{code:"KPF",fullname_vi:"CTCP Đầu tư Tài sản Koji",type:1,san:"HOSE"},{code:"KSB",fullname_vi:"CTCP Khoáng sản và Xây dựng Bình Dương",type:1,san:"HOSE"},{code:"KSD",fullname_vi:"CTCP Đầu tư DNA",type:1,san:"HNX"},{code:"KSF",fullname_vi:"CTCP Tập đoàn Real Tech",type:1,san:"HNX"},{code:"KSH",fullname_vi:"CTCP DAMAC GLS",type:1,san:"UPCOM"},{code:"KSQ",fullname_vi:"CTCP CNC Capital Việt Nam",type:1,san:"HNX"},{code:"KST",fullname_vi:"CTCP KASATI",type:1,san:"HNX"},{code:"KSV",fullname_vi:"Tổng Công ty Khoáng sản TKV - CTCP",type:1,san:"HNX"},{code:"KTC",fullname_vi:"CTCP Thương mại Kiên Giang",type:1,san:"UPCOM"},{code:"KTL",fullname_vi:"CTCP Kim Khí Thăng Long",type:1,san:"UPCOM"},{code:"KTS",fullname_vi:"CTCP Đường Kon Tum",type:1,san:"HNX"},{code:"KTT",fullname_vi:"CTCP Tập đoàn Đầu tư KTT",type:1,san:"HNX"},{code:"KVC",fullname_vi:"CTCP Sản xuất Xuất nhập khẩu Inox Kim Vĩ",type:1,san:"UPCOM"},{code:"L10",fullname_vi:"CTCP Lilama 10",type:1,san:"HOSE"},{code:"L12",fullname_vi:"CTCP Licogi 12",type:1,san:"UPCOM"},{code:"L14",fullname_vi:"CTCP Licogi 14",type:1,san:"HNX"},{code:"L18",fullname_vi:"CTCP Đầu tư và Xây dựng Số 18",type:1,san:"HNX"},{code:"L35",fullname_vi:"CTCP Cơ khí Lắp máy Lilama",type:1,san:"UPCOM"},{code:"L40",fullname_vi:"CTCP Đầu Tư và Xây dựng 40",type:1,san:"HNX"},{code:"L43",fullname_vi:"CTCP Lilama 45.3",type:1,san:"HNX"},{code:"L44",fullname_vi:"CTCP Lilama 45.4",type:1,san:"UPCOM"},{code:"L45",fullname_vi:"CTCP Lilama 45.1",type:1,san:"UPCOM"},{code:"L61",fullname_vi:"CTCP Lilama 69-1",type:1,san:"HNX"},{code:"L62",fullname_vi:"CTCP Lilama 69-2",type:1,san:"HNX"},{code:"L63",fullname_vi:"CTCP Lilama 69-3",type:1,san:"UPCOM"},{code:"LAF",fullname_vi:"CTCP Chế biến hàng Xuất khẩu Long An",type:1,san:"HOSE"},{code:"LAI",fullname_vi:"CTCP Đầu Tư Xây dựng Long An IDICO",type:1,san:"UPCOM"},{code:"LAS",fullname_vi:"CTCP Supe Phốt phát và Hóa chất Lâm Thao",type:1,san:"HNX"},{code:"LAW",fullname_vi:"CTCP Cấp thoát nước Long An",type:1,san:"UPCOM"},{code:"LBC",fullname_vi:"CTCP Thương mại - Đầu tư Long Biên",type:1,san:"UPCOM"},{code:"LBE",fullname_vi:"CTCP Sách và Thiết bị Trường học Long An",type:1,san:"HNX"},{code:"LBM",fullname_vi:"CTCP Khoáng sản và Vật liệu Xây dựng Lâm Đồng",type:1,san:"HOSE"},{code:"LCC",fullname_vi:"CTCP Xi măng Hồng Phong",type:1,san:"UPCOM"},{code:"LCD",fullname_vi:"CTCP Lắp máy - Thí nghiệm Cơ điện",type:1,san:"HNX"},{code:"LCG",fullname_vi:"CTCP Lizen",type:1,san:"HOSE"},{code:"LCM",fullname_vi:"CTCP Khai thác và Chế biến khoáng sản Lào Cai",type:1,san:"UPCOM"},{code:"LCS",fullname_vi:"CTCP Licogi 166",type:1,san:"UPCOM"},{code:"LCW",fullname_vi:"CTCP Nước sạch Lai Châu",type:1,san:""},{code:"LDG",fullname_vi:"CTCP Đầu tư LDG",type:1,san:"HOSE"},{code:"LDP",fullname_vi:"CTCP Dược Lâm Đồng - Ladophar",type:1,san:"HNX"},{code:"LDW",fullname_vi:"CTCP Cấp thoát nước Lâm Đồng",type:1,san:"UPCOM"},{code:"LEC",fullname_vi:"CTCP Bất động sản Điện lực Miền Trung",type:1,san:"HOSE"},{code:"LG9",fullname_vi:"CTCP Cơ giới và Xây lắp Số 9",type:1,san:"UPCOM"},{code:"LGC",fullname_vi:"CTCP Đầu tư Cầu đường CII",type:1,san:"HOSE"},{code:"LGL",fullname_vi:"CTCP Đầu tư và Phát triển Đô thị Long Giang",type:1,san:"HOSE"},{code:"LGM",fullname_vi:"CTCP Giày da và May mặc Xuất khẩu",type:1,san:"UPCOM"},{code:"LHC",fullname_vi:"CTCP Đầu tư và Xây dựng Thủy lợi Lâm Đồng",type:1,san:"HNX"},{code:"LHG",fullname_vi:"CTCP Long Hậu",type:1,san:"HOSE"},{code:"LIC",fullname_vi:"Tổng Công ty LICOGI - CTCP",type:1,san:"UPCOM"},{code:"LIG",fullname_vi:"CTCP Licogi 13",type:1,san:"HNX"},{code:"LIX",fullname_vi:"CTCP Bột Giặt Lix",type:1,san:"HOSE"},{code:"LKW",fullname_vi:"CTCP Cấp nước Long Khánh",type:1,san:"UPCOM"},{code:"LLM",fullname_vi:"Tổng Công ty Lắp máy Việt Nam - CTCP",type:1,san:"UPCOM"},{code:"LM3",fullname_vi:"CTCP Lilama 3",type:1,san:"UPCOM"},{code:"LM7",fullname_vi:"CTCP Lilama 7",type:1,san:"UPCOM"},{code:"LM8",fullname_vi:"CTCP Lilama 18",type:1,san:"HOSE"},{code:"LMC",fullname_vi:"CTCP Long Beach LMC",type:1,san:"UPCOM"},{code:"LMH",fullname_vi:"CTCP Quốc Tế Holding",type:1,san:"UPCOM"},{code:"LMI",fullname_vi:"CTCP Đầu tư Xây dựng Lắp máy IDICO",type:1,san:"UPCOM"},{code:"LNC",fullname_vi:"CTCP Lệ Ninh",type:1,san:"UPCOM"},{code:"LO5",fullname_vi:"CTCP Lilama 5",type:1,san:"UPCOM"},{code:"LPT",fullname_vi:"CTCP Thương mại và Sản xuất Lập Phương Thành",type:1,san:"UPCOM"},{code:"LQN",fullname_vi:"CTCP Licogi Quảng Ngãi",type:1,san:"UPCOM"},{code:"LSG",fullname_vi:"CTCP Bất động sản Sài Gòn Vina",type:1,san:"UPCOM"},{code:"LSS",fullname_vi:"CTCP Mía Đường Lam Sơn",type:1,san:"HOSE"},{code:"LTC",fullname_vi:"CTCP Điện nhẹ Viễn Thông",type:1,san:"UPCOM"},{code:"LTG",fullname_vi:"CTCP Tập đoàn Lộc Trời",type:1,san:"UPCOM"},{code:"LUT",fullname_vi:"CTCP Đầu tư Xây dựng Lương Tài",type:1,san:"UPCOM"},{code:"M10",fullname_vi:"Tổng Công ty May 10 - CTCP",type:1,san:"UPCOM"},{code:"MA1",fullname_vi:"CTCP Thiết bị",type:1,san:"UPCOM"},{code:"MAC",fullname_vi:"CTCP Cung ứng và Dịch vụ Kỹ thuật Hàng Hải",type:1,san:"HNX"},{code:"MAS",fullname_vi:"CTCP Dịch vụ Hàng không Sân bay Đà Nẵng",type:1,san:"HNX"},{code:"MBG",fullname_vi:"CTCP Tập đoàn MBG",type:1,san:"HNX"},{code:"MBN",fullname_vi:"CTCP Môi trường và Công trình đô thị Bắc Ninh",type:1,san:"UPCOM"},{code:"MCC",fullname_vi:"CTCP Gạch ngói Cao cấp",type:1,san:"HNX"},{code:"MCD",fullname_vi:"CTCP Môi trường và Công trình đô thị Đông Hà",type:1,san:""},{code:"MCF",fullname_vi:"CTCP Xây lắp Cơ khí và Lương thực Thực phẩm",type:1,san:"HNX"},{code:"MCG",fullname_vi:"CTCP Năng lượng và Bất động sản MCG",type:1,san:"UPCOM"},{code:"MCH",fullname_vi:"CTCP Hàng tiêu dùng Masan",type:1,san:"UPCOM"},{code:"MCI",fullname_vi:"CTCP Đầu tư Xây dựng và Phát triển Vật liệu IDICO",type:1,san:""},{code:"MCM",fullname_vi:"CTCP Giống Bò sữa Mộc Châu",type:1,san:"UPCOM"},{code:"MCO",fullname_vi:"CTCP Đầu tư và Xây dựng BDC Việt Nam",type:1,san:"HNX"},{code:"MCP",fullname_vi:"CTCP In và Bao bì Mỹ Châu",type:1,san:"HOSE"},{code:"MDA",fullname_vi:"CTCP Môi trường Đô thị Đông Anh",type:1,san:"UPCOM"},{code:"MDC",fullname_vi:"CTCP Than Mông Dương - Vinacomin",type:1,san:"HNX"},{code:"MDF",fullname_vi:"CTCP Gỗ MDF VRG - Quảng Trị",type:1,san:"UPCOM"},{code:"MDG",fullname_vi:"CTCP Miền Đông",type:1,san:"HOSE"},{code:"MEC",fullname_vi:"CTCP Cơ khí - Lắp máy Sông Đà",type:1,san:"UPCOM"},{code:"MED",fullname_vi:"CTCP Dược Trung ương Mediplantex",type:1,san:"HNX"},{code:"MEF",fullname_vi:"CTCP MEINFA",type:1,san:"UPCOM"},{code:"MEL",fullname_vi:"CTCP Thép Mê Lin",type:1,san:"HNX"},{code:"MES",fullname_vi:"CTCP Cơ điện Công trình",type:1,san:"UPCOM"},{code:"MFS",fullname_vi:"CTCP Dịch vụ Kỹ thuật Mobifone",type:1,san:"UPCOM"},{code:"MGC",fullname_vi:"CTCP Địa chất mỏ - TKV",type:1,san:"UPCOM"},{code:"MGG",fullname_vi:"Tổng Công ty Đức Giang - CTCP",type:1,san:"UPCOM"},{code:"MGR",fullname_vi:"CTCP Tập đoàn MGROUP",type:1,san:"UPCOM"},{code:"MH3",fullname_vi:"CTCP Khu Công nghiệp Cao su Bình Long",type:1,san:"UPCOM"},{code:"MHC",fullname_vi:"CTCP MHC",type:1,san:"HOSE"},{code:"MHL",fullname_vi:"CTCP Minh Hữu Liên",type:1,san:"HNX"},{code:"MIC",fullname_vi:"CTCP Kỹ nghệ Khoáng sản Quảng Nam",type:1,san:"UPCOM"},{code:"MIE",fullname_vi:"Tổng Công ty Máy và Thiết bị Công nghiệp - CTCP",type:1,san:"UPCOM"},{code:"MIM",fullname_vi:"CTCP Khoáng sản và Cơ khí",type:1,san:"UPCOM"},{code:"MKP",fullname_vi:"CTCP Hoá - Dược phẩm Mekophar",type:1,san:"UPCOM"},{code:"MKV",fullname_vi:"CTCP Dược thú Y Cai Lậy",type:1,san:"HNX"},{code:"MLC",fullname_vi:"CTCP Môi trường Đô thị Tỉnh Lào Cai",type:1,san:"UPCOM"},{code:"MLS",fullname_vi:"CTCP Chăn nuôi - Mitraco",type:1,san:"UPCOM"},{code:"MML",fullname_vi:"CTCP Masan MeatLife",type:1,san:"UPCOM"},{code:"MNB",fullname_vi:"Tổng Công ty May Nhà Bè - CTCP",type:1,san:"UPCOM"},{code:"MND",fullname_vi:"CTCP Môi trường Nam Định",type:1,san:"UPCOM"},{code:"MPC",fullname_vi:"CTCP Tập đoàn Thủy sản Minh Phú",type:1,san:"UPCOM"},{code:"MPT",fullname_vi:"CTCP Tập đoàn MPT",type:1,san:"UPCOM"},{code:"MPY",fullname_vi:"CTCP Môi trường Đô thị Phú Yên",type:1,san:"UPCOM"},{code:"MQB",fullname_vi:"CTCP Môi trường và Phát triển Đô thị Quảng Bình",type:1,san:"UPCOM"},{code:"MQN",fullname_vi:"CTCP Môi trường đô thị Quảng Ngãi",type:1,san:"UPCOM"},{code:"MRF",fullname_vi:"CTCP Merufa",type:1,san:"UPCOM"},{code:"MSH",fullname_vi:"CTCP May Sông Hồng",type:1,san:"HOSE"},{code:"MSN",fullname_vi:"CTCP Tập đoàn Masan",type:1,san:"HOSE"},{code:"MSR",fullname_vi:"CTCP Masan High-Tech Materials",type:1,san:"UPCOM"},{code:"MST",fullname_vi:"CTCP Đầu tư MST",type:1,san:"HNX"},{code:"MTA",fullname_vi:"Tổng Công ty Khoáng sản và Thương mại Hà Tĩnh - CTCP",type:1,san:"UPCOM"},{code:"MTB",fullname_vi:"CTCP Môi trường và Công trình Đô thị Tỉnh Thái Bình",type:1,san:"UPCOM"},{code:"MTC",fullname_vi:"CTCP Dịch vụ Du lịch Mỹ Trà",type:1,san:"UPCOM"},{code:"MTG",fullname_vi:"CTCP MT Gas",type:1,san:"UPCOM"},{code:"MTH",fullname_vi:"CTCP Môi trường Đô thị Hà Đông",type:1,san:"UPCOM"},{code:"MTL",fullname_vi:"CTCP Dịch vụ Môi trường Đô thị Từ Liêm",type:1,san:"UPCOM"},{code:"MTP",fullname_vi:"CTCP Dược Medipharco",type:1,san:"UPCOM"},{code:"MTS",fullname_vi:"CTCP Vật tư - TKV",type:1,san:"UPCOM"},{code:"MTV",fullname_vi:"CTCP Dịch vụ Môi trường và Công trình Đô thị Vũng Tàu",type:1,san:"UPCOM"},{code:"MVB",fullname_vi:"Tổng Công ty Công nghiệp mỏ Việt Bắc TKV - CTCP",type:1,san:"HNX"},{code:"MVC",fullname_vi:"CTCP Vật liệu và Xây dựng Bình Dương",type:1,san:"UPCOM"},{code:"MVN",fullname_vi:"Tổng Công ty Hàng hải Việt Nam - CTCP",type:1,san:"UPCOM"},{code:"MWG",fullname_vi:"CTCP Đầu tư Thế giới Di động",type:1,san:"HOSE"},{code:"NAC",fullname_vi:"CTCP Tư vấn Xây dựng Tổng hợp",type:1,san:"UPCOM"},{code:"NAF",fullname_vi:"CTCP Nafoods Group",type:1,san:"HOSE"},{code:"NAG",fullname_vi:"CTCP Tập đoàn Nagakawa",type:1,san:"HNX"},{code:"NAP",fullname_vi:"CTCP Cảng Nghệ Tĩnh",type:1,san:"HNX"},{code:"NAS",fullname_vi:"CTCP Dịch vụ Hàng không Sân bay Nội Bài",type:1,san:"UPCOM"},{code:"NAU",fullname_vi:"CTCP Môi trường Đô thị Nghệ An",type:1,san:"UPCOM"},{code:"NAV",fullname_vi:"CTCP Nam Việt",type:1,san:"HOSE"},{code:"NAW",fullname_vi:"CTCP Cấp nước Nghệ An",type:1,san:"UPCOM"},{code:"NBB",fullname_vi:"CTCP Đầu tư Năm Bảy Bảy",type:1,san:"HOSE"},{code:"NBC",fullname_vi:"CTCP Than Núi Béo - Vinacomin",type:1,san:"HNX"},{code:"NBE",fullname_vi:"CTCP Sách và Thiết bị Giáo dục Miền Bắc",type:1,san:"UPCOM"},{code:"NBP",fullname_vi:"CTCP Nhiệt điện Ninh Bình",type:1,san:"HNX"},{code:"NBT",fullname_vi:"CTCP Cấp thoát nước Bến Tre",type:1,san:"UPCOM"},{code:"NBW",fullname_vi:"CTCP Cấp nước Nhà Bè",type:1,san:"HNX"},{code:"NCS",fullname_vi:"CTCP Suất ăn Hàng không Nội Bài",type:1,san:"UPCOM"},{code:"NCT",fullname_vi:"CTCP Dịch vụ Hàng hóa Nội Bài",type:1,san:"HOSE"},{code:"ND2",fullname_vi:"CTCP Đầu tư và Phát triển Điện Miền Bắc 2",type:1,san:"UPCOM"},{code:"NDC",fullname_vi:"CTCP Nam Dược",type:1,san:"UPCOM"},{code:"NDF",fullname_vi:"CTCP Chế biến Thực phẩm Nông sản xuất khẩu Nam Định",type:1,san:"UPCOM"},{code:"NDN",fullname_vi:"CTCP Đầu tư Phát triển Nhà Đà Nẵng",type:1,san:"HNX"},{code:"NDP",fullname_vi:"CTCP Dược phẩm 2/9",type:1,san:"UPCOM"},{code:"NDT",fullname_vi:"Tổng CTCP Dệt May Nam Định",type:1,san:"UPCOM"},{code:"NDW",fullname_vi:"CTCP Cấp nước Nam Định",type:1,san:"UPCOM"},{code:"NDX",fullname_vi:"CTCP Xây lắp Phát triển Nhà Đà Nẵng",type:1,san:"HNX"},{code:"NED",fullname_vi:"CTCP Đầu tư và Phát triển Điện Tây Bắc",type:1,san:"UPCOM"},{code:"NET",fullname_vi:"CTCP Bột giặt NET",type:1,san:"HNX"},{code:"NFC",fullname_vi:"CTCP Phân lân Ninh Bình",type:1,san:"HNX"},{code:"NGC",fullname_vi:"CTCP Chế biến Thủy sản xuất khẩu Ngô Quyền",type:1,san:"UPCOM"},{code:"NHA",fullname_vi:"Tổng Công ty Đầu tư Phát triển Nhà và Đô thị Nam Hà Nội",type:1,san:"HOSE"},{code:"NHC",fullname_vi:"CTCP Gạch ngói Nhị Hiệp",type:1,san:"HNX"},{code:"NHH",fullname_vi:"CTCP Nhựa Hà Nội",type:1,san:"HOSE"},{code:"NHP",fullname_vi:"CTCP Sản xuất Xuất nhập khẩu NHP",type:1,san:"UPCOM"},{code:"NHT",fullname_vi:"CTCP Sản xuất và Thương mại Nam Hoa",type:1,san:"HOSE"},{code:"NHV",fullname_vi:"CTCP Sức Khỏe Hồi Sinh Việt Nam",type:1,san:"UPCOM"},{code:"NJC",fullname_vi:"CTCP May Nam Định",type:1,san:"UPCOM"},{code:"NKG",fullname_vi:"CTCP Thép Nam Kim",type:1,san:"HOSE"},{code:"NLG",fullname_vi:"CTCP Đầu tư Nam Long",type:1,san:"HOSE"},{code:"NLS",fullname_vi:"CTCP Cấp thoát nước Lạng Sơn",type:1,san:"UPCOM"},{code:"NNC",fullname_vi:"CTCP Đá Núi Nhỏ",type:1,san:"HOSE"},{code:"NNG",fullname_vi:"CTCP Công nghiệp - Dịch vụ - Thương mại Ngọc Nghĩa",type:1,san:""},{code:"NNT",fullname_vi:"CTCP Cấp nước Ninh Thuận",type:1,san:"UPCOM"},{code:"NO1",fullname_vi:"CTCP Tập đoàn 911",type:1,san:"HOSE"},{code:"NOS",fullname_vi:"CTCP Vận tải biển và Thương mại Phương Đông",type:1,san:"UPCOM"},{code:"NQB",fullname_vi:"CTCP Cấp nước Quảng Bình",type:1,san:"UPCOM"},{code:"NQN",fullname_vi:"CTCP Nước sạch Quảng Ninh",type:1,san:"UPCOM"},{code:"NQT",fullname_vi:"CTCP Nước sạch Quảng Trị",type:1,san:"UPCOM"},{code:"NRC",fullname_vi:"CTCP Tập Đoàn Danh Khôi",type:1,san:"HNX"},{code:"NS2",fullname_vi:"CTCP Nước sạch Số 2 Hà Nội",type:1,san:"UPCOM"},{code:"NSC",fullname_vi:"CTCP Tập đoàn Giống cây trồng Việt Nam",type:1,san:"HOSE"},{code:"NSG",fullname_vi:"CTCP Nhựa Sài Gòn",type:1,san:"UPCOM"},{code:"NSH",fullname_vi:"CTCP Nhôm Sông Hồng",type:1,san:"HNX"},{code:"NSL",fullname_vi:"CTCP Cấp nước Sơn La",type:1,san:"UPCOM"},{code:"NSS",fullname_vi:"CTCP Nông Súc Sản Đồng Nai",type:1,san:"UPCOM"},{code:"NST",fullname_vi:"CTCP Ngân Sơn",type:1,san:"HNX"},{code:"NT2",fullname_vi:"CTCP Điện lực Dầu khí Nhơn Trạch 2",type:1,san:"HOSE"},{code:"NTB",fullname_vi:"CTCP Đầu tư Xây dựng và Khai thác Công trình Giao thông 584",type:1,san:"UPCOM"},{code:"NTC",fullname_vi:"CTCP Khu Công nghiệp Nam Tân Uyên",type:1,san:"UPCOM"},{code:"NTF",fullname_vi:"CTCP Dược - Vật tư Y tế Nghệ An",type:1,san:"UPCOM"},{code:"NTH",fullname_vi:"CTCP Thủy điện Nước Trong",type:1,san:"HNX"},{code:"NTL",fullname_vi:"CTCP Phát triển Đô thị Từ Liêm",type:1,san:"HOSE"},{code:"NTP",fullname_vi:"CTCP Nhựa Thiếu niên Tiền Phong",type:1,san:"HNX"},{code:"NTT",fullname_vi:"CTCP Dệt - May Nha Trang",type:1,san:"UPCOM"},{code:"NTW",fullname_vi:"CTCP Cấp nước Nhơn Trạch",type:1,san:"UPCOM"},{code:"NUE",fullname_vi:"CTCP Môi trường Đô thị Nha Trang",type:1,san:"UPCOM"},{code:"NVL",fullname_vi:"CTCP Tập đoàn Đầu tư Địa ốc No Va",type:1,san:"HOSE"},{code:"NVP",fullname_vi:"CTCP Nước sạch Vĩnh Phúc",type:1,san:"UPCOM"},{code:"NVT",fullname_vi:"CTCP Bất động sản Du lịch Ninh Vân Bay",type:1,san:"HOSE"},{code:"NWT",fullname_vi:"CTCP Vận tải Newway",type:1,san:"UPCOM"},{code:"NXT",fullname_vi:"CTCP Sản xuất và Cung ứng Vật liệu Xây dựng Kon Tum",type:1,san:"UPCOM"},{code:"OCH",fullname_vi:"CTCP One Capital Hospitality",type:1,san:"HNX"},{code:"ODE",fullname_vi:"CTCP Tập đoàn Truyền thông và Giải trí ODE",type:1,san:"UPCOM"},{code:"OGC",fullname_vi:"CTCP Tập đoàn Đại Dương",type:1,san:"HOSE"},{code:"OIL",fullname_vi:"Tổng Công ty Dầu Việt Nam - CTCP",type:1,san:"UPCOM"},{code:"ONE",fullname_vi:"CTCP Công nghệ ONE",type:1,san:"HNX"},{code:"ONW",fullname_vi:"CTCP Dịch vụ Một Thế Giới",type:1,san:"UPCOM"},{code:"OPC",fullname_vi:"CTCP Dược phẩm OPC",type:1,san:"HOSE"},{code:"PAC",fullname_vi:"CTCP Pin Ắc quy Miền Nam",type:1,san:"HOSE"},{code:"PAI",fullname_vi:"CTCP Công nghệ thông tin Viễn thông và Tự động hóa Dầu Khí",type:1,san:"UPCOM"},{code:"PAN",fullname_vi:"CTCP Tập đoàn Pan",type:1,san:"HOSE"},{code:"PAP",fullname_vi:"CTCP Dầu khí Đầu tư Khai thác Cảng Phước An",type:1,san:"UPCOM"},{code:"PAS",fullname_vi:"CTCP Quốc tế Phương Anh",type:1,san:"UPCOM"},{code:"PAT",fullname_vi:"CTCP Phốt Pho Apatit Việt Nam",type:1,san:"UPCOM"},{code:"PBC",fullname_vi:"CTCP Dược phẩm Trung Ương 1- Pharbaco",type:1,san:"UPCOM"},{code:"PBP",fullname_vi:"CTCP Bao bì Dầu khí Việt Nam",type:1,san:"HNX"},{code:"PBT",fullname_vi:"CTCP Nhà và Thương mại Dầu khí",type:1,san:"UPCOM"},{code:"PC1",fullname_vi:"CTCP Tập Đoàn PC1",type:1,san:"HOSE"},{code:"PCC",fullname_vi:"CTCP Tập đoàn Xây lắp 1 - Petrolimex",type:1,san:"UPCOM"},{code:"PCE",fullname_vi:"CTCP Phân bón và Hóa chất Dầu khí Miền Trung",type:1,san:"HNX"},{code:"PCF",fullname_vi:"CTCP Cà phê PETEC",type:1,san:"UPCOM"},{code:"PCG",fullname_vi:"CTCP Đầu tư Phát triển Gas Đô thị",type:1,san:"HNX"},{code:"PCH",fullname_vi:"CTCP Nhựa Picomat",type:1,san:"HNX"},{code:"PCM",fullname_vi:"CTCP Vật liệu Xây dựng Bưu điện",type:1,san:"UPCOM"},{code:"PCN",fullname_vi:"CTCP Hóa phẩm Dầu khí DMC - Miền Bắc",type:1,san:"UPCOM"},{code:"PCT",fullname_vi:"CTCP Vận tải Khí và Hoá chất Việt Nam",type:1,san:"HNX"},{code:"PDB",fullname_vi:"CTCP Tập đoàn Đầu tư Din Capital",type:1,san:"HNX"},{code:"PDC",fullname_vi:"CTCP Du lịch Dầu khí Phương Đông",type:1,san:"UPCOM"},{code:"PDN",fullname_vi:"CTCP Cảng Đồng Nai",type:1,san:"HOSE"},{code:"PDR",fullname_vi:"CTCP Phát triển Bất động sản Phát Đạt",type:1,san:"HOSE"},{code:"PDV",fullname_vi:"CTCP Vận Tải Và Tiếp Vận Phương Đông Việt",type:1,san:"UPCOM"},{code:"PEC",fullname_vi:"CTCP Cơ khí Điện lực",type:1,san:"UPCOM"},{code:"PEG",fullname_vi:"Tổng Công ty Thương mại Kỹ thuật và Đầu tư - CTCP",type:1,san:"UPCOM"},{code:"PEN",fullname_vi:"CTCP Xây lắp III Petrolimex",type:1,san:"HNX"},{code:"PEQ",fullname_vi:"CTCP Thiết bị Xăng dầu Petrolimex",type:1,san:"UPCOM"},{code:"PET",fullname_vi:"Tổng CTCP Dịch vụ Tổng hợp Dầu khí",type:1,san:"HOSE"},{code:"PFL",fullname_vi:"CTCP Dầu khí Đông Đô",type:1,san:"UPCOM"},{code:"PGC",fullname_vi:"Tổng Công ty Gas Petrolimex - CTCP",type:1,san:"HOSE"},{code:"PGD",fullname_vi:"CTCP Phân phối khí thấp áp Dầu khí Việt Nam",type:1,san:"HOSE"},{code:"PGN",fullname_vi:"CTCP Phụ Gia Nhựa",type:1,san:"HNX"},{code:"PGS",fullname_vi:"CTCP Kinh doanh Khí Miền Nam",type:1,san:"HNX"},{code:"PGT",fullname_vi:"CTCP PGT Holdings",type:1,san:"HNX"},{code:"PGV",fullname_vi:"Tổng Công ty Phát điện 3 - CTCP",type:1,san:"HOSE"},{code:"PHC",fullname_vi:"CTCP Xây dựng Phục Hưng Holdings",type:1,san:"HOSE"},{code:"PHH",fullname_vi:"CTCP Hồng Hà Việt Nam",type:1,san:"UPCOM"},{code:"PHN",fullname_vi:"CTCP Pin Hà Nội",type:1,san:"HNX"},{code:"PHP",fullname_vi:"CTCP Cảng Hải Phòng",type:1,san:"UPCOM"},{code:"PHR",fullname_vi:"CTCP Cao su Phước Hòa",type:1,san:"HOSE"},{code:"PIA",fullname_vi:"CTCP Tin học Viễn thông Petrolimex",type:1,san:"HNX"},{code:"PIC",fullname_vi:"CTCP Đầu tư Điện lực 3",type:1,san:"HNX"},{code:"PID",fullname_vi:"CTCP Trang Trí Nội Thất Dầu khí",type:1,san:"UPCOM"},{code:"PIS",fullname_vi:"Tổng Công ty Pisico Bình Định - CTCP",type:1,san:"UPCOM"},{code:"PIT",fullname_vi:"CTCP Xuất nhập khẩu Petrolimex",type:1,san:"HOSE"},{code:"PIV",fullname_vi:"CTCP PIV",type:1,san:"UPCOM"},{code:"PJC",fullname_vi:"CTCP Thương mại và Vận tải Petrolimex Hà Nội",type:1,san:"HNX"},{code:"PJS",fullname_vi:"CTCP Cấp nước Phú Hòa Tân",type:1,san:"UPCOM"},{code:"PJT",fullname_vi:"CTCP Vận tải Xăng dầu đường Thủy Petrolimex",type:1,san:"HOSE"},{code:"PLA",fullname_vi:"CTCP Đầu tư và Dịch vụ Hạ tầng Xăng dầu",type:1,san:"UPCOM"},{code:"PLC",fullname_vi:"Tổng Công ty Hóa dầu Petrolimex - CTCP",type:1,san:"HNX"},{code:"PLE",fullname_vi:"CTCP Tư vấn Xây dựng Petrolimex",type:1,san:"UPCOM"},{code:"PLO",fullname_vi:"CTCP Kho Vận Petec",type:1,san:"UPCOM"},{code:"PLP",fullname_vi:"CTCP Sản xuất và Công nghệ Nhựa Pha Lê",type:1,san:"HOSE"},{code:"PLX",fullname_vi:"Tập đoàn Xăng Dầu Việt Nam",type:1,san:"HOSE"},{code:"PMB",fullname_vi:"CTCP Phân bón và Hóa chất Dầu khí Miền Bắc",type:1,san:"HNX"},{code:"PMC",fullname_vi:"CTCP Dược phẩm Dược liệu Pharmedic",type:1,san:"HNX"},{code:"PMG",fullname_vi:"CTCP Đầu tư và Sản xuất Petro Miền Trung",type:1,san:"HOSE"},{code:"PMJ",fullname_vi:"CTCP Vật tư Bưu Điện",type:1,san:"UPCOM"},{code:"PMP",fullname_vi:"CTCP Bao bì đạm Phú Mỹ",type:1,san:"HNX"},{code:"PMS",fullname_vi:"CTCP Cơ khí Xăng dầu",type:1,san:"HNX"},{code:"PMT",fullname_vi:"CTCP Viễn thông TELVINA Việt Nam",type:1,san:"UPCOM"},{code:"PMW",fullname_vi:"CTCP Cấp nước Phú Mỹ",type:1,san:"UPCOM"},{code:"PNC",fullname_vi:"CTCP Văn hóa Phương Nam",type:1,san:"HOSE"},{code:"PND",fullname_vi:"CTCP Xăng dầu Dầu khí Nam Định",type:1,san:"UPCOM"},{code:"PNG",fullname_vi:"CTCP Thương mại Phú Nhuận",type:1,san:"UPCOM"},{code:"PNJ",fullname_vi:"CTCP Vàng bạc Đá quý Phú Nhuận",type:1,san:"HOSE"},{code:"PNP",fullname_vi:"CTCP Tân Cảng - Phú Hữu",type:1,san:"UPCOM"},{code:"PNT",fullname_vi:"CTCP Kỹ thuật Xây dựng Phú Nhuận",type:1,san:"UPCOM"},{code:"POB",fullname_vi:"CTCP Xăng dầu Dầu khí Thái Bình",type:1,san:"UPCOM"},{code:"POM",fullname_vi:"CTCP Thép Pomina",type:1,san:"HOSE"},{code:"POS",fullname_vi:"CTCP Dịch vụ Lắp đặt, Vận hành và Bảo dưỡng Công trình Dầu khí Biển PTSC",type:1,san:"UPCOM"},{code:"POT",fullname_vi:"CTCP Thiết bị Bưu điện",type:1,san:"HNX"},{code:"POV",fullname_vi:"CTCP Xăng dầu Dầu khí Vũng Áng",type:1,san:"UPCOM"},{code:"POW",fullname_vi:"Tổng Công ty Điện lực Dầu khí Việt Nam - CTCP",type:1,san:"HOSE"},{code:"PPC",fullname_vi:"CTCP Nhiệt điện Phả Lại",type:1,san:"HOSE"},{code:"PPE",fullname_vi:"CTCP Tư vấn Điện lực Dầu khí Việt Nam",type:1,san:"HNX"},{code:"PPH",fullname_vi:"Tổng CTCP Phong Phú",type:1,san:"UPCOM"},{code:"PPI",fullname_vi:"CTCP Đầu tư và Phát triển Dự án Hạ tầng Thái Bình Dương",type:1,san:"UPCOM"},{code:"PPP",fullname_vi:"CTCP Dược phẩm Phong Phú",type:1,san:"HNX"},{code:"PPS",fullname_vi:"CTCP Dịch vụ Kỹ thuật Điện lực Dầu khí Việt Nam",type:1,san:"HNX"},{code:"PPT",fullname_vi:"CTCP Petro Times",type:1,san:"HNX"},{code:"PPY",fullname_vi:"CTCP Xăng dầu Dầu khí Phú Yên",type:1,san:"HNX"},{code:"PQN",fullname_vi:"CTCP Dịch vụ Dầu khí Quảng Ngãi PTSC",type:1,san:"UPCOM"},{code:"PRC",fullname_vi:"CTCP Logistics Portserco",type:1,san:"HNX"},{code:"PRO",fullname_vi:"CTCP Procimex Việt Nam",type:1,san:"UPCOM"},{code:"PRT",fullname_vi:"Tổng Công ty Sản xuất - Xuất nhập khẩu Bình Dương - CTCP",type:1,san:"UPCOM"},{code:"PSB",fullname_vi:"CTCP Đầu tư Dầu khí Sao Mai - Bến Đình",type:1,san:"UPCOM"},{code:"PSC",fullname_vi:"CTCP Vận tải và Dịch vụ Petrolimex Sài Gòn",type:1,san:"HNX"},{code:"PSD",fullname_vi:"CTCP Dịch vụ Phân phối Tổng hợp Dầu khí",type:1,san:"HNX"},{code:"PSE",fullname_vi:"CTCP Phân Bón và Hóa Chất Dầu khí Đông Nam Bộ",type:1,san:"HNX"},{code:"PSG",fullname_vi:"CTCP Đầu Tư và Xây lắp Dầu khí Sài Gòn",type:1,san:"UPCOM"},{code:"PSH",fullname_vi:"CTCP Thương mại Đầu tư Dầu khí Nam Sông Hậu",type:1,san:"HOSE"},{code:"PSL",fullname_vi:"CTCP Chăn nuôi Phú Sơn",type:1,san:"UPCOM"},{code:"PSN",fullname_vi:"CTCP Cảng Dịch vụ Dầu khí Tổng hợp PTSC Thanh Hóa",type:1,san:"UPCOM"},{code:"PSP",fullname_vi:"CTCP Cảng Dịch vụ Dầu khí Đình Vũ",type:1,san:"UPCOM"},{code:"PSW",fullname_vi:"CTCP Phân bón và Hóa chất Dầu khí Tây Nam Bộ",type:1,san:"HNX"},{code:"PTB",fullname_vi:"CTCP Phú Tài",type:1,san:"HOSE"},{code:"PTC",fullname_vi:"CTCP Đầu Tư Icapital",type:1,san:"HOSE"},{code:"PTD",fullname_vi:"CTCP Thiết kế Xây dựng Thương mại Phúc Thịnh",type:1,san:"HNX"},{code:"PTE",fullname_vi:"CTCP Xi măng Phú Thọ",type:1,san:"UPCOM"},{code:"PTG",fullname_vi:"CTCP May Xuất khẩu Phan Thiết",type:1,san:"UPCOM"},{code:"PTH",fullname_vi:"CTCP Vận tải và Dịch vụ Petrolimex Hà Tây",type:1,san:"UPCOM"},{code:"PTL",fullname_vi:"CTCP Victory Capital",type:1,san:"HOSE"},{code:"PTN",fullname_vi:"CTCP Phát triển Nhà Khánh Hòa",type:1,san:""},{code:"PTO",fullname_vi:"CTCP Dịch vụ - Xây dựng Công trình Bưu Điện",type:1,san:"UPCOM"},{code:"PTP",fullname_vi:"CTCP Dịch vụ Viễn thông và In Bưu điện",type:1,san:"UPCOM"},{code:"PTS",fullname_vi:"CTCP Vận tải và Dịch vụ Petrolimex Hải Phòng",type:1,san:"HNX"},{code:"PTT",fullname_vi:"CTCP Vận tải Dầu khí Đông Dương",type:1,san:"UPCOM"},{code:"PTV",fullname_vi:"CTCP Thương mại Dầu khí",type:1,san:"UPCOM"},{code:"PTX",fullname_vi:"CTCP Vận tải và Dịch vụ Petrolimex Nghệ Tĩnh",type:1,san:"UPCOM"},{code:"PV2",fullname_vi:"CTCP Đầu tư PV2",type:1,san:"HNX"},{code:"PVA",fullname_vi:"CTCP Tổng Công ty Xây lắp Dầu khí Nghệ An",type:1,san:"UPCOM"},{code:"PVB",fullname_vi:"CTCP Bọc ống Dầu khí Việt Nam",type:1,san:"HNX"},{code:"PVC",fullname_vi:"Tổng Công ty Hóa chất và Dịch vụ Dầu khí - CTCP",type:1,san:"HNX"},{code:"PVD",fullname_vi:"Tổng CTCP Khoan và Dịch vụ khoan Dầu khí",type:1,san:"HOSE"},{code:"PVE",fullname_vi:"Tổng Công ty Tư vấn thiết kế Dầu khí - CTCP",type:1,san:"UPCOM"},{code:"PVG",fullname_vi:"CTCP Kinh doanh LPG Việt Nam",type:1,san:"HNX"},{code:"PVH",fullname_vi:"CTCP Xây lắp Dầu khí Thanh Hóa",type:1,san:"UPCOM"},{code:"PVL",fullname_vi:"CTCP Đầu tư Nhà Đất Việt",type:1,san:"UPCOM"},{code:"PVM",fullname_vi:"CTCP Máy - Thiết bị Dầu khí",type:1,san:"UPCOM"},{code:"PVO",fullname_vi:"CTCP Dầu nhờn PV Oil",type:1,san:"UPCOM"},{code:"PVP",fullname_vi:"CTCP Vận tải Dầu khí Thái Bình Dương",type:1,san:"HOSE"},{code:"PVR",fullname_vi:"CTCP Đầu tư PVR Hà Nội",type:1,san:"UPCOM"},{code:"PVS",fullname_vi:"Tổng CTCP Dịch vụ Kỹ thuật Dầu khí Việt Nam",type:1,san:"HNX"},{code:"PVT",fullname_vi:"Tổng CTCP Vận tải Dầu khí",type:1,san:"HOSE"},{code:"PVV",fullname_vi:"CTCP Vinaconex 39",type:1,san:"UPCOM"},{code:"PVX",fullname_vi:"Tổng CTCP Xây lắp Dầu khí Việt Nam",type:1,san:"UPCOM"},{code:"PVY",fullname_vi:"CTCP Chế tạo Giàn khoan Dầu khí",type:1,san:"UPCOM"},{code:"PWA",fullname_vi:"CTCP Bất động sản Dầu khí",type:1,san:"UPCOM"},{code:"PWS",fullname_vi:"CTCP Cấp thoát nước Phú Yên",type:1,san:"UPCOM"},{code:"PX1",fullname_vi:"CTCP Xi măng Sông Lam 2",type:1,san:"UPCOM"},{code:"PXA",fullname_vi:"CTCP Đầu tư và Thương mại Dầu khí Nghệ An",type:1,san:"UPCOM"},{code:"PXC",fullname_vi:"CTCP Phát triển Đô thị Dầu khí",type:1,san:"UPCOM"},{code:"PXI",fullname_vi:"CTCP Xây dựng Công nghiệp và Dân dụng Dầu khí",type:1,san:"UPCOM"},{code:"PXL",fullname_vi:"CTCP Đầu tư Khu Công nghiệp Dầu khí Long Sơn",type:1,san:"UPCOM"},{code:"PXM",fullname_vi:"CTCP Xây lắp Dầu khí Miền Trung",type:1,san:"UPCOM"},{code:"PXS",fullname_vi:"CTCP Kết cấu Kim loại và Lắp máy Dầu khí",type:1,san:"UPCOM"},{code:"PXT",fullname_vi:"CTCP Xây lắp Đường ống Bể chứa Dầu khí",type:1,san:"UPCOM"},{code:"QBS",fullname_vi:"CTCP Xuất nhập khẩu Quảng Bình",type:1,san:"HOSE"},{code:"QCC",fullname_vi:"CTCP Đầu tư Xây dựng và Phát triển Hạ tầng Viễn thông",type:1,san:"UPCOM"},{code:"QCG",fullname_vi:"CTCP Quốc Cường Gia Lai",type:1,san:"HOSE"},{code:"QHD",fullname_vi:"CTCP Que hàn điện Việt Đức",type:1,san:"HNX"},{code:"QHW",fullname_vi:"CTCP Nước khoáng Quảng Ninh",type:1,san:"UPCOM"},{code:"QNC",fullname_vi:"CTCP Xi măng và Xây dựng Quảng Ninh",type:1,san:"UPCOM"},{code:"QNS",fullname_vi:"CTCP Đường Quảng Ngãi",type:1,san:"UPCOM"},{code:"QNT",fullname_vi:"CTCP Tư vấn và đầu tư phát triển Quảng Nam",type:1,san:"UPCOM"},{code:"QNU",fullname_vi:"CTCP Môi trường Đô thị Quảng Nam",type:1,san:"UPCOM"},{code:"QNW",fullname_vi:"CTCP Cấp thoát nước và Xây dựng Quảng Ngãi",type:1,san:"UPCOM"},{code:"QPH",fullname_vi:"CTCP Thủy điện Quế Phong",type:1,san:"UPCOM"},{code:"QSP",fullname_vi:"CTCP Tân Cảng Quy Nhơn",type:1,san:"UPCOM"},{code:"QST",fullname_vi:"CTCP Sách và Thiết bị Trường học Quảng Ninh",type:1,san:"HNX"},{code:"QTC",fullname_vi:"CTCP Công trình Giao thông Vận tải Quảng Nam",type:1,san:"HNX"},{code:"QTP",fullname_vi:"CTCP Nhiệt điện Quảng Ninh",type:1,san:"UPCOM"},{code:"RAL",fullname_vi:"CTCP Bóng đèn Phích nước Rạng Đông",type:1,san:"HOSE"},{code:"RAT",fullname_vi:"CTCP Vận tải và Thương mại Đường sắt",type:1,san:"UPCOM"},{code:"RBC",fullname_vi:"CTCP Công nghiệp và Xuất nhập khẩu Cao su",type:1,san:"UPCOM"},{code:"RCC",fullname_vi:"CTCP Tổng Công ty Công trình Đường sắt",type:1,san:"UPCOM"},{code:"RCD",fullname_vi:"CTCP Xây dựng - Địa ốc Cao su",type:1,san:"UPCOM"},{code:"RCL",fullname_vi:"CTCP Địa ốc Chợ Lớn",type:1,san:"HNX"},{code:"RDP",fullname_vi:"CTCP Rạng Đông Holding",type:1,san:"HOSE"},{code:"REE",fullname_vi:"CTCP Cơ Điện Lạnh",type:1,san:"HOSE"},{code:"RGC",fullname_vi:"CTCP Đầu tư PV - Inconess",type:1,san:""},{code:"RIC",fullname_vi:"CTCP Quốc tế Hoàng Gia",type:1,san:"UPCOM"},{code:"RTB",fullname_vi:"CTCP Cao su Tân Biên",type:1,san:"UPCOM"},{code:"S12",fullname_vi:"CTCP Sông Đà 12",type:1,san:"UPCOM"},{code:"S27",fullname_vi:"CTCP Sông Đà 27",type:1,san:"UPCOM"},{code:"S4A",fullname_vi:"CTCP Thủy điện Sê San 4A",type:1,san:"HOSE"},{code:"S55",fullname_vi:"CTCP Sông Đà 505",type:1,san:"HNX"},{code:"S72",fullname_vi:"CTCP Sông Đà 7.02",type:1,san:"UPCOM"},{code:"S74",fullname_vi:"CTCP Sông Đà 7.04",type:1,san:"UPCOM"},{code:"S96",fullname_vi:"CTCP Sông Đà 9.06",type:1,san:"UPCOM"},{code:"S99",fullname_vi:"CTCP SCI",type:1,san:"HNX"},{code:"SAB",fullname_vi:"Tổng CTCP Bia - Rượu - Nước giải khát Sài Gòn",type:1,san:"HOSE"},{code:"SAC",fullname_vi:"CTCP Xếp dỡ và Dịch vụ Cảng Sài Gòn",type:1,san:"UPCOM"},{code:"SAF",fullname_vi:"CTCP Lương thực Thực phẩm Safoco",type:1,san:"HNX"},{code:"SAL",fullname_vi:"CTCP Trục vớt Cứu hộ Việt Nam",type:1,san:"UPCOM"},{code:"SAM",fullname_vi:"CTCP SAM HOLDINGS",type:1,san:"HOSE"},{code:"SAP",fullname_vi:"CTCP In Sách giáo khoa Thành phố Hồ Chí Minh",type:1,san:"UPCOM"},{code:"SAS",fullname_vi:"CTCP Dịch vụ Hàng không Sân bay Tân Sơn Nhất",type:1,san:"UPCOM"},{code:"SAV",fullname_vi:"CTCP Hợp tác Kinh tế và Xuất nhập khẩu Savimex",type:1,san:"HOSE"},{code:"SB1",fullname_vi:"CTCP Bia Sài Gòn - Nghệ Tĩnh",type:1,san:"UPCOM"},{code:"SBA",fullname_vi:"CTCP Sông Ba",type:1,san:"HOSE"},{code:"SBD",fullname_vi:"CTCP Công nghệ Sao Bắc Đẩu",type:1,san:"UPCOM"},{code:"SBH",fullname_vi:"CTCP Thủy điện Sông Ba Hạ",type:1,san:"UPCOM"},{code:"SBL",fullname_vi:"CTCP Bia Sài Gòn - Bạc Liêu",type:1,san:"UPCOM"},{code:"SBM",fullname_vi:"CTCP Đầu tư Phát triển Bắc Minh",type:1,san:"UPCOM"},{code:"SBR",fullname_vi:"CTCP Cao su Sông Bé",type:1,san:"UPCOM"},{code:"SBT",fullname_vi:"CTCP Thành Thành Công - Biên Hòa",type:1,san:"HOSE"},{code:"SBV",fullname_vi:"CTCP Siam Brothers Việt Nam",type:1,san:"HOSE"},{code:"SC5",fullname_vi:"CTCP Xây dựng Số 5",type:1,san:"HOSE"},{code:"SCC",fullname_vi:"CTCP Thương mại Đầu tư SHB",type:1,san:"UPCOM"},{code:"SCD",fullname_vi:"CTCP Nước giải khát Chương Dương",type:1,san:"HOSE"},{code:"SCG",fullname_vi:"CTCP Xây dựng SCG",type:1,san:"HNX"},{code:"SCI",fullname_vi:"CTCP SCI E&C",type:1,san:"HNX"},{code:"SCJ",fullname_vi:"CTCP Xi măng Sài Sơn",type:1,san:"UPCOM"},{code:"SCL",fullname_vi:"CTCP Sông Đà Cao Cường",type:1,san:"UPCOM"},{code:"SCO",fullname_vi:"CTCP Công nghiệp Thủy sản",type:1,san:"UPCOM"},{code:"SCR",fullname_vi:"CTCP Địa ốc Sài Gòn Thương Tín",type:1,san:"HOSE"},{code:"SCS",fullname_vi:"CTCP Dịch vụ Hàng hóa Sài Gòn",type:1,san:"HOSE"},{code:"SCY",fullname_vi:"CTCP Đóng tàu Sông Cấm",type:1,san:"UPCOM"},{code:"SD1",fullname_vi:"CTCP Sông Đà 1",type:1,san:"UPCOM"},{code:"SD2",fullname_vi:"CTCP Sông Đà 2",type:1,san:"UPCOM"},{code:"SD3",fullname_vi:"CTCP Sông Đà 3",type:1,san:"UPCOM"},{code:"SD4",fullname_vi:"CTCP Sông Đà 4",type:1,san:"UPCOM"},{code:"SD5",fullname_vi:"CTCP Sông Đà 5",type:1,san:"HNX"},{code:"SD6",fullname_vi:"CTCP Sông Đà 6",type:1,san:"HNX"},{code:"SD7",fullname_vi:"CTCP Sông Đà 7",type:1,san:"UPCOM"},{code:"SD8",fullname_vi:"CTCP Sông Đà 8",type:1,san:"UPCOM"},{code:"SD9",fullname_vi:"CTCP Sông Đà 9",type:1,san:"HNX"},{code:"SDA",fullname_vi:"CTCP Simco Sông Đà",type:1,san:"HNX"},{code:"SDB",fullname_vi:"CTCP Sông Đà 207",type:1,san:"UPCOM"},{code:"SDC",fullname_vi:"CTCP Tư vấn Sông Đà",type:1,san:"HNX"},{code:"SDD",fullname_vi:"CTCP Đầu tư và Xây lắp Sông Đà",type:1,san:"UPCOM"},{code:"SDG",fullname_vi:"CTCP Sadico Cần Thơ",type:1,san:"HNX"},{code:"SDJ",fullname_vi:"CTCP Sông Đà 25",type:1,san:"UPCOM"},{code:"SDK",fullname_vi:"CTCP Cơ khí Luyện kim",type:1,san:"UPCOM"},{code:"SDN",fullname_vi:"CTCP Sơn Đồng Nai",type:1,san:"HNX"},{code:"SDP",fullname_vi:"CTCP SDP",type:1,san:"UPCOM"},{code:"SDT",fullname_vi:"CTCP Sông Đà 10",type:1,san:"UPCOM"},{code:"SDU",fullname_vi:"CTCP Đầu tư Xây dựng và Phát triển Đô thị Sông Đà",type:1,san:"HNX"},{code:"SDV",fullname_vi:"CTCP Dịch vụ Sonadezi",type:1,san:"UPCOM"},{code:"SDX",fullname_vi:"CTCP Phòng cháy Chữa cháy và Đầu tư Xây dựng Sông Đà",type:1,san:"UPCOM"},{code:"SDY",fullname_vi:"CTCP Xi măng Sông Đà Yaly",type:1,san:"UPCOM"},{code:"SEA",fullname_vi:"Tổng Công ty Thủy sản Việt Nam - CTCP",type:1,san:"UPCOM"},{code:"SEB",fullname_vi:"CTCP Đầu tư và Phát triển Điện Miền Trung",type:1,san:"HNX"},{code:"SED",fullname_vi:"CTCP Đầu tư và Phát triển Giáo dục Phương Nam",type:1,san:"HNX"},{code:"SEP",fullname_vi:"CTCP Tổng Công ty Thương mại Quảng Trị",type:1,san:"UPCOM"},{code:"SFC",fullname_vi:"CTCP Nhiên liệu Sài Gòn",type:1,san:"HOSE"},{code:"SFG",fullname_vi:"CTCP Phân Bón Miền Nam",type:1,san:"HOSE"},{code:"SFI",fullname_vi:"CTCP Đại lý Vận tải SAFI",type:1,san:"HOSE"},{code:"SFN",fullname_vi:"CTCP Dệt lưới Sài Gòn",type:1,san:"HNX"},{code:"SGC",fullname_vi:"CTCP Xuất nhập khẩu Sa Giang",type:1,san:"HNX"},{code:"SGD",fullname_vi:"CTCP Sách Giáo dục tại Thành phố Hồ Chí Minh",type:1,san:"HNX"},{code:"SGH",fullname_vi:"CTCP Khách sạn Sài Gòn",type:1,san:"HNX"},{code:"SGI",fullname_vi:"CTCP Đầu tư Phát triển Sài Gòn 3 Group",type:1,san:"UPCOM"},{code:"SGN",fullname_vi:"CTCP Phục vụ Mặt đất Sài Gòn",type:1,san:"HOSE"},{code:"SGO",fullname_vi:"CTCP Dầu thực vật Sài Gòn",type:1,san:""},{code:"SGP",fullname_vi:"CTCP Cảng Sài Gòn",type:1,san:"UPCOM"},{code:"SGR",fullname_vi:"Tổng CTCP Địa ốc Sài Gòn",type:1,san:"HOSE"},{code:"SGS",fullname_vi:"CTCP Vận tải biển Sài Gòn",type:1,san:"UPCOM"},{code:"SGT",fullname_vi:"CTCP Công nghệ Viễn Thông Sài Gòn",type:1,san:"HOSE"},{code:"SHA",fullname_vi:"CTCP Sơn Hà Sài Gòn",type:1,san:"HOSE"},{code:"SHC",fullname_vi:"CTCP Hàng hải Sài Gòn",type:1,san:"UPCOM"},{code:"SHE",fullname_vi:"CTCP Phát triển năng lượng Sơn Hà",type:1,san:"HNX"},{code:"SHG",fullname_vi:"Tổng CTCP Sông Hồng",type:1,san:"UPCOM"},{code:"SHI",fullname_vi:"CTCP Quốc tế Sơn Hà",type:1,san:"HOSE"},{code:"SHN",fullname_vi:"CTCP Đầu tư Tổng hợp Hà Nội",type:1,san:"HNX"},{code:"SHP",fullname_vi:"CTCP Thủy điện Miền Nam",type:1,san:"HOSE"},{code:"SHX",fullname_vi:"CTCP Sài Gòn Hỏa xa",type:1,san:""},{code:"SIC",fullname_vi:"CTCP ANI",type:1,san:""},{code:"SID",fullname_vi:"CTCP Đầu tư Phát triển Sài Gòn Co.op",type:1,san:"UPCOM"},{code:"SIG",fullname_vi:"CTCP Đầu tư và Thương mại Sông Đà",type:1,san:"UPCOM"},{code:"SII",fullname_vi:"CTCP Hạ tầng Nước Sài Gòn",type:1,san:"UPCOM"},{code:"SIP",fullname_vi:"CTCP Đầu tư Sài Gòn VRG",type:1,san:"HOSE"},{code:"SIV",fullname_vi:"CTCP SIVICO",type:1,san:"UPCOM"},{code:"SJ1",fullname_vi:"CTCP Nông nghiệp Hùng Hậu",type:1,san:"HNX"},{code:"SJC",fullname_vi:"CTCP Sông Đà 1.01",type:1,san:"UPCOM"},{code:"SJD",fullname_vi:"CTCP Thủy điện Cần Đơn",type:1,san:"HOSE"},{code:"SJE",fullname_vi:"CTCP Sông Đà 11",type:1,san:"HNX"},{code:"SJF",fullname_vi:"CTCP Đầu tư Sao Thái Dương",type:1,san:"HOSE"},{code:"SJG",fullname_vi:"Tổng Công ty Sông Đà - CTCP",type:1,san:"UPCOM"},{code:"SJM",fullname_vi:"CTCP Sông Đà 19",type:1,san:"UPCOM"},{code:"SJS",fullname_vi:"CTCP Đầu tư Phát triển Đô thị và Khu công nghiệp Sông Đà",type:1,san:"HOSE"},{code:"SKG",fullname_vi:"CTCP Tàu cao tốc Superdong - Kiên Giang",type:1,san:"HOSE"},{code:"SKH",fullname_vi:"CTCP Nước giải khát Sanest Khánh Hòa",type:1,san:"UPCOM"},{code:"SKN",fullname_vi:"CTCP Nước giải khát Sanna Khánh Hòa",type:1,san:"UPCOM"},{code:"SKV",fullname_vi:"CTCP Nước giải khát Yến sào Khánh Hòa",type:1,san:"UPCOM"},{code:"SLS",fullname_vi:"CTCP Mía Đường Sơn La",type:1,san:"HNX"},{code:"SMA",fullname_vi:"CTCP Thiết bị Phụ tùng Sài Gòn",type:1,san:"HOSE"},{code:"SMB",fullname_vi:"CTCP Bia Sài Gòn - Miền Trung",type:1,san:"HOSE"},{code:"SMC",fullname_vi:"CTCP Đầu tư Thương mại SMC",type:1,san:"HOSE"},{code:"SMN",fullname_vi:"CTCP Sách và Thiết bị Giáo dục Miền Nam",type:1,san:"HNX"},{code:"SMT",fullname_vi:"CTCP Sametel",type:1,san:"HNX"},{code:"SNC",fullname_vi:"CTCP Xuất nhập khẩu Thủy sản Năm Căn",type:1,san:"UPCOM"},{code:"SNZ",fullname_vi:"Tổng CTCP Phát triển Khu Công nghiệp",type:1,san:"UPCOM"},{code:"SP2",fullname_vi:"CTCP Thủy điện Sử Pán 2",type:1,san:"UPCOM"},{code:"SPB",fullname_vi:"CTCP Sợi Phú Bài",type:1,san:"UPCOM"},{code:"SPC",fullname_vi:"CTCP Bảo vệ Thực vật Sài Gòn",type:1,san:"HNX"},{code:"SPD",fullname_vi:"CTCP Xuất nhập khẩu Thủy sản Miền Trung",type:1,san:"UPCOM"},{code:"SPH",fullname_vi:"CTCP Xuất nhập khẩu Thủy sản Hà Nội",type:1,san:"UPCOM"},{code:"SPI",fullname_vi:"CTCP Spiral Galaxy",type:1,san:"HNX"},{code:"SPM",fullname_vi:"CTCP SPM",type:1,san:"HOSE"},{code:"SPV",fullname_vi:"CTCP Thủy Đặc sản",type:1,san:"UPCOM"},{code:"SQC",fullname_vi:"CTCP Khoáng sản Sài Gòn - Quy Nhơn",type:1,san:"UPCOM"},{code:"SRA",fullname_vi:"CTCP Sara Việt Nam",type:1,san:"HNX"},{code:"SRB",fullname_vi:"CTCP Tập đoàn Sara",type:1,san:"UPCOM"},{code:"SRC",fullname_vi:"CTCP Cao su Sao Vàng",type:1,san:"HOSE"},{code:"SRF",fullname_vi:"CTCP Searefico",type:1,san:"HOSE"},{code:"SRT",fullname_vi:"CTCP Vận tải Đường sắt Sài Gòn",type:1,san:"UPCOM"},{code:"SSC",fullname_vi:"CTCP Giống cây trồng Miền Nam",type:1,san:"HOSE"},{code:"SSF",fullname_vi:"CTCP Giáo dục G Sài Gòn",type:1,san:"UPCOM"},{code:"SSG",fullname_vi:"CTCP Vận tải biển Hải Âu",type:1,san:"UPCOM"},{code:"SSH",fullname_vi:"CTCP Phát triển Sunshine Homes",type:1,san:"UPCOM"},{code:"SSM",fullname_vi:"CTCP Chế tạo kết cấu Thép Vneco.SSM",type:1,san:"HNX"},{code:"SSN",fullname_vi:"CTCP Xuất nhập khẩu Thủy sản Sài Gòn",type:1,san:"UPCOM"},{code:"ST8",fullname_vi:"CTCP Đầu tư Phát triển ST8",type:1,san:"HOSE"},{code:"STC",fullname_vi:"CTCP Sách và Thiết bị Trường học Thành phố Hồ Chí Minh",type:1,san:"HNX"},{code:"STG",fullname_vi:"CTCP Kho vận Miền Nam",type:1,san:"HOSE"},{code:"STH",fullname_vi:"CTCP Phát hành Sách Thái Nguyên",type:1,san:"UPCOM"},{code:"STK",fullname_vi:"CTCP Sợi Thế Kỷ",type:1,san:"HOSE"},{code:"STL",fullname_vi:"CTCP Sông Đà Thăng Long",type:1,san:"UPCOM"},{code:"STP",fullname_vi:"CTCP Công nghiệp Thương mại Sông Đà",type:1,san:"HNX"},{code:"STS",fullname_vi:"CTCP Dịch vụ Vận tải Sài Gòn",type:1,san:"UPCOM"},{code:"STT",fullname_vi:"CTCP Vận chuyển Sài Gòn Tourist",type:1,san:"UPCOM"},{code:"STW",fullname_vi:"CTCP Cấp nước Sóc Trăng",type:1,san:"UPCOM"},{code:"SVC",fullname_vi:"CTCP Dịch vụ Tổng hợp Sài Gòn",type:1,san:"HOSE"},{code:"SVD",fullname_vi:"CTCP Đầu tư & Thương mại Vũ Đăng",type:1,san:"HOSE"},{code:"SVG",fullname_vi:"CTCP Hơi Kỹ nghệ Que hàn",type:1,san:"UPCOM"},{code:"SVH",fullname_vi:"CTCP Thủy điện Sông Vàng",type:1,san:"UPCOM"},{code:"SVI",fullname_vi:"CTCP Bao bì Biên Hòa",type:1,san:"HOSE"},{code:"SVN",fullname_vi:"CTCP Tập đoàn Vexilla Việt Nam",type:1,san:"HNX"},{code:"SVT",fullname_vi:"CTCP Công nghệ Sài Gòn Viễn Đông",type:1,san:"HOSE"},{code:"SWC",fullname_vi:"Tổng CTCP Đường sông Miền Nam",type:1,san:"UPCOM"},{code:"SZB",fullname_vi:"CTCP Sonadezi Long Bình",type:1,san:"HNX"},{code:"SZC",fullname_vi:"CTCP Sonadezi Châu Đức",type:1,san:"HOSE"},{code:"SZE",fullname_vi:"CTCP Môi trường Sonadezi",type:1,san:"UPCOM"},{code:"SZG",fullname_vi:"CTCP Sonadezi Giang Điền",type:1,san:"UPCOM"},{code:"SZL",fullname_vi:"CTCP Sonadezi Long Thành",type:1,san:"HOSE"},{code:"TA3",fullname_vi:"CTCP Đầu tư và Xây lắp Thành An 386",type:1,san:"UPCOM"},{code:"TA6",fullname_vi:"CTCP Đầu tư và Xây lắp Thành An 665",type:1,san:"UPCOM"},{code:"TA9",fullname_vi:"CTCP Xây lắp Thành An 96",type:1,san:"HNX"},{code:"TAN",fullname_vi:"CTCP Cà phê Thuận An",type:1,san:"UPCOM"},{code:"TAR",fullname_vi:"CTCP Nông nghiệp Công nghệ cao Trung An",type:1,san:"HNX"},{code:"TAW",fullname_vi:"CTCP Cấp nước Trung An",type:1,san:"UPCOM"},{code:"TB8",fullname_vi:"CTCP Sản xuất và Kinh doanh Vật tư Thiết bị - VVMI",type:1,san:"UPCOM"},{code:"TBC",fullname_vi:"CTCP Thủy điện Thác Bà",type:1,san:"HOSE"},{code:"TBD",fullname_vi:"Tổng Công ty Thiết bị Điện Đông Anh - CTCP",type:1,san:"UPCOM"},{code:"TBH",fullname_vi:"CTCP Tổng Bách hóa",type:1,san:"UPCOM"},{code:"TBR",fullname_vi:"CTCP Địa ốc Tân Bình",type:1,san:"UPCOM"},{code:"TBT",fullname_vi:"CTCP Xây dựng Công trình Giao thông Bến Tre",type:1,san:"UPCOM"},{code:"TBX",fullname_vi:"CTCP Xi măng Thái Bình",type:1,san:"HNX"},{code:"TC6",fullname_vi:"CTCP Than Cọc Sáu - Vinacomin",type:1,san:"HNX"},{code:"TCD",fullname_vi:"CTCP Đầu tư Phát triển Công nghiệp và Vận tải",type:1,san:"HOSE"},{code:"TCH",fullname_vi:"CTCP Đầu tư Dịch vụ Tài chính Hoàng Huy",type:1,san:"HOSE"},{code:"TCJ",fullname_vi:"CTCP Tô Châu",type:1,san:"UPCOM"},{code:"TCK",fullname_vi:"Tổng Công ty Cơ khí Xây dựng - CTCP",type:1,san:"UPCOM"},{code:"TCL",fullname_vi:"CTCP Đại lý Giao nhận Vận tải Xếp dỡ Tân Cảng",type:1,san:"HOSE"},{code:"TCM",fullname_vi:"CTCP Dệt may - Đầu tư - Thương mại Thành Công",type:1,san:"HOSE"},{code:"TCO",fullname_vi:"CTCP Vận tải Đa phương thức Duyên Hải",type:1,san:"HOSE"},{code:"TCR",fullname_vi:"CTCP Công nghiệp Gốm sứ Taicera",type:1,san:"HOSE"},{code:"TCT",fullname_vi:"CTCP Cáp treo Núi Bà Tây Ninh",type:1,san:"HOSE"},{code:"TCW",fullname_vi:"CTCP Kho Vận Tân Cảng",type:1,san:"UPCOM"},{code:"TDB",fullname_vi:"CTCP Thủy điện Định Bình",type:1,san:"UPCOM"},{code:"TDC",fullname_vi:"CTCP Kinh doanh và Phát triển Bình Dương",type:1,san:"HOSE"},{code:"TDF",fullname_vi:"CTCP Trung Đô",type:1,san:"UPCOM"},{code:"TDG",fullname_vi:"CTCP Đầu tư TDG GLOBAL",type:1,san:"HOSE"},{code:"TDH",fullname_vi:"CTCP Phát triển Nhà Thủ Đức",type:1,san:"HOSE"},{code:"TDI",fullname_vi:"CTCP Tập đoàn TDI",type:1,san:""},{code:"TDM",fullname_vi:"CTCP Nước Thủ Dầu Một",type:1,san:"HOSE"},{code:"TDN",fullname_vi:"CTCP Than Đèo Nai - Vinacomin",type:1,san:"HNX"},{code:"TDP",fullname_vi:"CTCP Thuận Đức",type:1,san:"HOSE"},{code:"TDS",fullname_vi:"CTCP Thép Thủ Đức - VNSTEEL",type:1,san:"UPCOM"},{code:"TDT",fullname_vi:"CTCP Đầu tư và Phát triển TDT",type:1,san:"HNX"},{code:"TDW",fullname_vi:"CTCP Cấp nước Thủ Đức",type:1,san:"HOSE"},{code:"TED",fullname_vi:"Tổng Công ty tư vấn thiết kế giao thông vận tải - CTCP",type:1,san:"UPCOM"},{code:"TEG",fullname_vi:"CTCP Năng lượng và Bất động sản Trường Thành",type:1,san:"HOSE"},{code:"TEL",fullname_vi:"CTCP Phát triển Công trình Viễn thông",type:1,san:"UPCOM"},{code:"A32",fullname_vi:"CTCP 32",type:1,san:"UPCOM"},{code:"TFC",fullname_vi:"CTCP Trang",type:1,san:"HNX"},{code:"TGG",fullname_vi:"CTCP The Golden Group",type:1,san:"UPCOM"},{code:"TGP",fullname_vi:"CTCP Trường Phú",type:1,san:"UPCOM"},{code:"TH1",fullname_vi:"CTCP Xuất nhập khẩu tổng hợp 1 Việt Nam",type:1,san:"UPCOM"},{code:"THB",fullname_vi:"CTCP Bia Hà Nội - Thanh Hóa",type:1,san:"HNX"},{code:"THD",fullname_vi:"CTCP Thaiholdings",type:1,san:"HNX"},{code:"THG",fullname_vi:"CTCP Đầu tư và Xây dựng Tiền Giang",type:1,san:"HOSE"},{code:"THN",fullname_vi:"CTCP Cấp nước Thanh Hóa",type:1,san:"UPCOM"},{code:"THP",fullname_vi:"CTCP Thủy sản và Thương mại Thuận Phước",type:1,san:"UPCOM"},{code:"THS",fullname_vi:"CTCP Thanh Hoa - Sông Đà",type:1,san:"HNX"},{code:"THT",fullname_vi:"CTCP Than Hà Tu - Vinacomin",type:1,san:"HNX"},{code:"THU",fullname_vi:"CTCP Môi trường và Công trình Đô thị Thanh Hóa",type:1,san:"UPCOM"},{code:"THW",fullname_vi:"CTCP Cấp nước Tân Hòa",type:1,san:"UPCOM"},{code:"TID",fullname_vi:"CTCP Tổng Công ty Tín Nghĩa",type:1,san:"UPCOM"},{code:"TIE",fullname_vi:"CTCP TIE",type:1,san:"UPCOM"},{code:"TIG",fullname_vi:"CTCP Tập đoàn Đầu tư Thăng Long",type:1,san:"HNX"},{code:"TIP",fullname_vi:"CTCP Phát triển Khu Công nghiệp Tín Nghĩa",type:1,san:"HOSE"},{code:"TIS",fullname_vi:"CTCP Gang thép Thái Nguyên",type:1,san:"UPCOM"},{code:"TIX",fullname_vi:"CTCP Sản xuất Kinh doanh Xuất nhập khẩu Dịch vụ và Đầu tư Tân Bình",type:1,san:"HOSE"},{code:"TJC",fullname_vi:"CTCP Dịch vụ Vận tải và Thương mại",type:1,san:"HNX"},{code:"TKA",fullname_vi:"CTCP Bao bì Tân Khánh An",type:1,san:"UPCOM"},{code:"TKC",fullname_vi:"CTCP Xây dựng và Kinh doanh Địa ốc Tân Kỷ",type:1,san:"UPCOM"},{code:"TKG",fullname_vi:"CTCP Sản xuất và Thương mại Tùng Khánh",type:1,san:"HNX"},{code:"TKU",fullname_vi:"CTCP Công nghiệp Tung Kuang",type:1,san:"HNX"},{code:"TL4",fullname_vi:"Tổng CTCP Xây dựng Thủy Lợi 4",type:1,san:"UPCOM"},{code:"TLD",fullname_vi:"CTCP Đầu tư Xây dựng và Phát triển Đô thị Thăng Long",type:1,san:"HOSE"},{code:"TLG",fullname_vi:"CTCP Tập đoàn Thiên Long",type:1,san:"HOSE"},{code:"TLH",fullname_vi:"CTCP Tập đoàn Thép Tiến Lên",type:1,san:"HOSE"},{code:"TLI",fullname_vi:"CTCP May Quốc tế Thắng Lợi",type:1,san:"UPCOM"},{code:"TLP",fullname_vi:"Tổng Công ty Thương mại Xuất nhập khẩu Thanh Lễ - CTCP",type:1,san:"UPCOM"},{code:"TLT",fullname_vi:"CTCP Viglacera Thăng Long",type:1,san:"UPCOM"},{code:"TMB",fullname_vi:"CTCP Kinh doanh Than Miền Bắc - Vinacomin",type:1,san:"HNX"},{code:"TMC",fullname_vi:"CTCP Thương mại Xuất nhập khẩu Thủ Đức",type:1,san:"HNX"},{code:"TMG",fullname_vi:"CTCP Kim loại màu Thái Nguyên - Vimico",type:1,san:"UPCOM"},{code:"TMP",fullname_vi:"CTCP Thủy điện Thác Mơ",type:1,san:"HOSE"},{code:"TMS",fullname_vi:"CTCP Transimex",type:1,san:"HOSE"},{code:"TMT",fullname_vi:"CTCP Ô tô TMT",type:1,san:"HOSE"},{code:"TMW",fullname_vi:"CTCP Tổng hợp Gỗ Tân Mai",type:1,san:"UPCOM"},{code:"TMX",fullname_vi:"CTCP VICEM Thương mại Xi măng",type:1,san:"HNX"},{code:"TN1",fullname_vi:"CTCP Thương mại Dịch vụ TNS Holdings",type:1,san:"HOSE"},{code:"TNA",fullname_vi:"CTCP Thương mại Xuất nhập khẩu Thiên Nam",type:1,san:"HOSE"},{code:"TNB",fullname_vi:"CTCP Thép Nhà Bè - VNSTEEL",type:1,san:"UPCOM"},{code:"TNC",fullname_vi:"CTCP Cao su Thống Nhất",type:1,san:"HOSE"},{code:"TNG",fullname_vi:"CTCP Đầu tư và Thương mại TNG",type:1,san:"HNX"},{code:"TNH",fullname_vi:"CTCP Bệnh viện Quốc tế Thái Nguyên",type:1,san:"HOSE"},{code:"TNI",fullname_vi:"CTCP Tập đoàn Thành Nam",type:1,san:"HOSE"},{code:"TNM",fullname_vi:"CTCP Xuất nhập khẩu và Xây dựng Công trình",type:1,san:"UPCOM"},{code:"TNP",fullname_vi:"CTCP Cảng Thị Nại",type:1,san:"UPCOM"},{code:"TNS",fullname_vi:"CTCP Thép tấm lá Thống Nhất",type:1,san:"UPCOM"},{code:"TNT",fullname_vi:"CTCP Tập đoàn TNT",type:1,san:"HOSE"},{code:"TNW",fullname_vi:"CTCP Nước sạch Thái Nguyên",type:1,san:"UPCOM"},{code:"TOP",fullname_vi:"CTCP Phân phối Top One",type:1,san:"UPCOM"},{code:"TOS",fullname_vi:"CTCP Dịch vụ biển Tân Cảng",type:1,san:"UPCOM"},{code:"TOT",fullname_vi:"CTCP Vận tải Transimex",type:1,san:"HNX"},{code:"TOW",fullname_vi:"CTCP Cấp nước Trà Nóc - Ô Môn",type:1,san:"UPCOM"},{code:"TPC",fullname_vi:"CTCP Nhựa Tân Đại Hưng",type:1,san:"HOSE"},{code:"TPH",fullname_vi:"CTCP In sách giáo khoa tại Thành phố Hà Nội",type:1,san:"HNX"},{code:"TPP",fullname_vi:"CTCP Tân Phú Việt Nam",type:1,san:"HNX"},{code:"TPS",fullname_vi:"CTCP Bến Bãi Vận tải Sài Gòn",type:1,san:"UPCOM"},{code:"TQN",fullname_vi:"CTCP Thông Quảng Ninh",type:1,san:"UPCOM"},{code:"TQW",fullname_vi:"CTCP Cấp thoát nước Tuyên Quang",type:1,san:"UPCOM"},{code:"TR1",fullname_vi:"CTCP Vận tải 1 Traco",type:1,san:"UPCOM"},{code:"TRA",fullname_vi:"CTCP Traphaco",type:1,san:"HOSE"},{code:"TRC",fullname_vi:"CTCP Cao su Tây Ninh",type:1,san:"HOSE"},{code:"TRS",fullname_vi:"CTCP Vận tải và Dịch vụ Hàng hải",type:1,san:"UPCOM"},{code:"TRT",fullname_vi:"CTCP RedstarCera",type:1,san:"UPCOM"},{code:"TS3",fullname_vi:"CTCP Trường Sơn 532",type:1,san:"UPCOM"},{code:"TS4",fullname_vi:"CTCP Thủy sản Số 4",type:1,san:"UPCOM"},{code:"TSB",fullname_vi:"CTCP Ắc quy Tia Sáng",type:1,san:"HNX"},{code:"TSC",fullname_vi:"CTCP Vật tư Kỹ thuật nông nghiệp Cần Thơ",type:1,san:"HOSE"},{code:"TSD",fullname_vi:"CTCP Du lịch Trường Sơn COECCO",type:1,san:"UPCOM"},{code:"TSG",fullname_vi:"CTCP Thông tin Tín hiệu Đường sắt Sài Gòn",type:1,san:"UPCOM"},{code:"TSJ",fullname_vi:"CTCP Du lịch Dịch vụ Hà Nội",type:1,san:"UPCOM"},{code:"TST",fullname_vi:"CTCP Dịch vụ Kỹ Thuật Viễn thông",type:1,san:"UPCOM"},{code:"TTA",fullname_vi:"CTCP Đầu tư Xây dựng và Phát triển Trường Thành",type:1,san:"HOSE"},{code:"TTB",fullname_vi:"CTCP Tập đoàn Tiến Bộ",type:1,san:"UPCOM"},{code:"TTC",fullname_vi:"CTCP Gạch men Thanh Thanh",type:1,san:"HNX"},{code:"TTD",fullname_vi:"CTCP Bệnh viện tim Tâm Đức",type:1,san:"UPCOM"},{code:"TTE",fullname_vi:"CTCP Đầu tư Năng lượng Trường Thịnh",type:1,san:"HOSE"},{code:"TTF",fullname_vi:"CTCP Tập đoàn Kỹ nghệ gỗ Trường Thành",type:1,san:"HOSE"},{code:"TTG",fullname_vi:"CTCP May Thanh Trì",type:1,san:"UPCOM"},{code:"TTH",fullname_vi:"CTCP Thương mại và Dịch vụ Tiến Thành",type:1,san:"HNX"},{code:"TTL",fullname_vi:"Tổng Công ty Thăng Long - CTCP",type:1,san:"HNX"},{code:"TTN",fullname_vi:"CTCP Công nghệ và Truyền thông Việt Nam",type:1,san:"UPCOM"},{code:"TTP",fullname_vi:"CTCP Bao bì Tân Tiến",type:1,san:"UPCOM"},{code:"TTS",fullname_vi:"CTCP Cán Thép Thái Trung",type:1,san:"UPCOM"},{code:"TTT",fullname_vi:"CTCP Du lịch - Thương mại Tây Ninh",type:1,san:"HNX"},{code:"TTZ",fullname_vi:"CTCP Đầu tư Xây dựng và Công nghệ Tiến Trung",type:1,san:"UPCOM"},{code:"TUG",fullname_vi:"CTCP Lai Dắt và Vận tải Cảng Hải Phòng",type:1,san:"UPCOM"},{code:"TV1",fullname_vi:"CTCP Tư vấn Xây dựng Điện 1",type:1,san:"UPCOM"},{code:"TV2",fullname_vi:"CTCP Tư vấn Xây dựng Điện 2",type:1,san:"HOSE"},{code:"TV3",fullname_vi:"CTCP Tư vấn Xây dựng Điện 3",type:1,san:"HNX"},{code:"TV4",fullname_vi:"CTCP Tư vấn Xây dựng Điện 4",type:1,san:"HNX"},{code:"TV6",fullname_vi:"CTCP Thương mại Đầu tư xây lắp điện Thịnh Vượng",type:1,san:"UPCOM"},{code:"TVA",fullname_vi:"CTCP Sứ Viglacera Thanh Trì",type:1,san:"UPCOM"},{code:"TVC",fullname_vi:"CTCP Tập đoàn Quản lý Tài sản Trí Việt",type:1,san:"HNX"},{code:"TVD",fullname_vi:"CTCP Than Vàng Danh - Vinacomin",type:1,san:"HNX"},{code:"TVG",fullname_vi:"CTCP Tư vấn Đầu tư và Xây dựng Giao thông Vận tải",type:1,san:"UPCOM"},{code:"TVH",fullname_vi:"CTCP Tư vấn Xây dựng công trình Hàng hải",type:1,san:"UPCOM"},{code:"TVM",fullname_vi:"CTCP Tư vấn Đầu tư mỏ và Công Nghiệp - Vinacomin",type:1,san:"UPCOM"},{code:"TVN",fullname_vi:"Tổng Công ty Thép Việt Nam - CTCP",type:1,san:"UPCOM"},{code:"TVP",fullname_vi:"CTCP Dược phẩm TV.Pharm",type:1,san:""},{code:"TVT",fullname_vi:"Tổng Công ty Việt Thắng - CTCP",type:1,san:"HOSE"},{code:"TVW",fullname_vi:"CTCP Cấp thoát nước Trà Vinh",type:1,san:""},{code:"TW3",fullname_vi:"CTCP Dược Trung ương 3",type:1,san:"UPCOM"},{code:"TXM",fullname_vi:"CTCP VICEM Thạch cao Xi măng",type:1,san:"HNX"},{code:"TIN",fullname_vi:"Công ty Tài chính Cổ phần Tín Việt",type:2,san:"UPCOM"},{code:"SGB",fullname_vi:"Ngân hàng TMCP Sài Gòn Công Thương",type:2,san:"UPCOM"},{code:"VIB",fullname_vi:"Ngân hàng TMCP Quốc tế Việt Nam",type:2,san:"HOSE"},{code:"SSB",fullname_vi:"Ngân hàng TMCP Đông Nam Á",type:2,san:"HOSE"},{code:"TPB",fullname_vi:"Ngân hàng TMCP Tiên Phong",type:2,san:"HOSE"},{code:"HDB",fullname_vi:"Ngân hàng TMCP Phát triển TP. HCM",type:2,san:"HOSE"},{code:"BID",fullname_vi:"Ngân hàng TMCP Đầu tư và Phát triển Việt Nam",type:2,san:"HOSE"},{code:"MBB",fullname_vi:"Ngân hàng TMCP Quân Đội",type:2,san:"HOSE"},{code:"VCB",fullname_vi:"Ngân hàng TMCP Ngoại thương Việt Nam",type:2,san:"HOSE"},{code:"CTG",fullname_vi:"Ngân hàng TMCP Công Thương Việt Nam",type:2,san:"HOSE"},{code:"SHB",fullname_vi:"Ngân hàng TMCP Sài Gòn - Hà Nội",type:2,san:"HOSE"},{code:"LPB",fullname_vi:"Ngân hàng TMCP Bưu điện Liên Việt",type:2,san:"HOSE"},{code:"EVF",fullname_vi:"Công ty Tài chính Cổ phần Điện lực",type:2,san:"HOSE"},{code:"OCB",fullname_vi:"Ngân hàng TMCP Phương Đông",type:2,san:"HOSE"},{code:"BAB",fullname_vi:"Ngân hàng TMCP Bắc Á",type:2,san:"HNX"},{code:"NAB",fullname_vi:"Ngân hàng TMCP Nam Á",type:2,san:"HOSE"},{code:"NVB",fullname_vi:"Ngân hàng TMCP Quốc Dân",type:2,san:"HNX"},{code:"EIB",fullname_vi:"Ngân hàng TMCP Xuất nhập khẩu Việt Nam",type:2,san:"HOSE"},{code:"TCB",fullname_vi:"Ngân hàng TMCP Kỹ thương Việt Nam",type:2,san:"HOSE"},{code:"VPB",fullname_vi:"Ngân hàng TMCP Việt Nam Thịnh Vượng",type:2,san:"HOSE"},{code:"ACB",fullname_vi:"Ngân hàng TMCP Á Châu",type:2,san:"HOSE"},{code:"BVB",fullname_vi:"Ngân hàng TMCP Bản Việt",type:2,san:"UPCOM"},{code:"MSB",fullname_vi:"Ngân hàng TMCP Hàng hải Việt Nam",type:2,san:"HOSE"},{code:"VAB",fullname_vi:"Ngân hàng TMCP Việt Á",type:2,san:"UPCOM"},{code:"KLB",fullname_vi:"Ngân hàng TMCP Kiên Long",type:2,san:"UPCOM"},{code:"VBB",fullname_vi:"Ngân hàng TMCP Việt Nam Thương Tín",type:2,san:"UPCOM"},{code:"PGB",fullname_vi:"Ngân hàng TMCP Xăng dầu Petrolimex",type:2,san:"UPCOM"},{code:"ABB",fullname_vi:"Ngân hàng TMCP An Bình",type:2,san:"UPCOM"},{code:"STB",fullname_vi:"Ngân hàng TMCP Sài Gòn Thương Tín",type:2,san:"HOSE"},{code:"ABI",fullname_vi:"CTCP Bảo hiểm Ngân hàng Nông nghiệp Việt Nam",type:3,san:"UPCOM"},{code:"VNR",fullname_vi:"Tổng CTCP Tái Bảo hiểm Quốc gia Việt Nam",type:3,san:"HNX"},{code:"BIC",fullname_vi:"Tổng CTCP Bảo hiểm Ngân hàng Đầu tư và Phát triển Việt Nam",type:3,san:"HOSE"},{code:"BHI",fullname_vi:"Tổng CTCP Bảo hiểm Sài Gòn - Hà Nội",type:3,san:"UPCOM"},{code:"MIG",fullname_vi:"Tổng CTCP Bảo hiểm Quân Đội",type:3,san:"HOSE"},{code:"PTI",fullname_vi:"Tổng CTCP Bảo hiểm Bưu điện",type:3,san:"HNX"},{code:"PGI",fullname_vi:"Tổng CTCP Bảo hiểm Petrolimex",type:3,san:"HOSE"},{code:"PVI",fullname_vi:"CTCP PVI",type:3,san:"HNX"},{code:"BMI",fullname_vi:"Tổng CTCP Bảo Minh",type:3,san:"HOSE"},{code:"AIC",fullname_vi:"Tổng CTCP Bảo hiểm Hàng không",type:3,san:"UPCOM"},{code:"PRE",fullname_vi:"Tổng CTCP Tái bảo hiểm PVI",type:3,san:"HNX"},{code:"BVH",fullname_vi:"Tập đoàn Bảo Việt",type:3,san:"HOSE"},{code:"BLI",fullname_vi:"Tổng CTCP Bảo hiểm Bảo Long",type:3,san:"UPCOM"},{code:"SHS",fullname_vi:"CTCP Chứng khoán Sài Gòn - Hà Nội",type:4,san:"HNX"},{code:"ABW",fullname_vi:"CTCP Chứng khoán An Bình",type:4,san:"UPCOM"},{code:"DSC",fullname_vi:"CTCP Chứng khoán DSC",type:4,san:"UPCOM"},{code:"PSI",fullname_vi:"CTCP Chứng khoán Dầu khí",type:4,san:"HNX"},{code:"AGR",fullname_vi:"CTCP Chứng khoán Agribank",type:4,san:"HOSE"},{code:"VCI",fullname_vi:"CTCP Chứng khoán VietCap",type:4,san:"HOSE"},{code:"APG",fullname_vi:"CTCP Chứng khoán APG",type:4,san:"HOSE"},{code:"AAS",fullname_vi:"CTCP Chứng khoán SmartInvest",type:4,san:"UPCOM"},{code:"APS",fullname_vi:"CTCP Chứng khoán Châu Á Thái Bình Dương",type:4,san:"HNX"},{code:"ART",fullname_vi:"CTCP Chứng khoán BOS",type:4,san:"UPCOM"},{code:"VDS",fullname_vi:"CTCP Chứng khoán Rồng Việt",type:4,san:"HOSE"},{code:"VUA",fullname_vi:"CTCP Chứng khoán Stanley Brothers",type:4,san:"UPCOM"},{code:"EVS",fullname_vi:"CTCP Chứng khoán Everest",type:4,san:"HNX"},{code:"CSI",fullname_vi:"CTCP Chứng khoán Kiến thiết Việt Nam",type:4,san:"UPCOM"},{code:"ORS",fullname_vi:"CTCP Chứng khoán Tiên Phong",type:4,san:"HOSE"},{code:"VFS",fullname_vi:"CTCP Chứng khoán Nhất Việt",type:4,san:"HNX"},{code:"WSS",fullname_vi:"CTCP Chứng khoán Phố Wall",type:4,san:"HNX"},{code:"CTS",fullname_vi:"CTCP Chứng khoán Ngân hàng Công thương Việt Nam",type:4,san:"HOSE"},{code:"MBS",fullname_vi:"CTCP Chứng khoán MB",type:4,san:"HNX"},{code:"FTS",fullname_vi:"CTCP Chứng khoán FPT",type:4,san:"HOSE"},{code:"SSI",fullname_vi:"CTCP Chứng khoán SSI",type:4,san:"HOSE"},{code:"BMS",fullname_vi:"CTCP Chứng khoán Bảo Minh",type:4,san:"UPCOM"},{code:"VIG",fullname_vi:"CTCP Chứng khoán Đầu tư Tài chính Việt Nam",type:4,san:"HNX"},{code:"VIX",fullname_vi:"CTCP Chứng khoán VIX",type:4,san:"HOSE"},{code:"BSI",fullname_vi:"CTCP Chứng khoán BIDV",type:4,san:"HOSE"},{code:"PHS",fullname_vi:"CTCP Chứng khoán Phú Hưng",type:4,san:"UPCOM"},{code:"SBS",fullname_vi:"CTCP Chứng khoán SBS",type:4,san:"UPCOM"},{code:"HAC",fullname_vi:"CTCP Chứng khoán Hải Phòng",type:4,san:"UPCOM"},{code:"BVS",fullname_vi:"CTCP Chứng khoán Bảo Việt",type:4,san:"HNX"},{code:"TVB",fullname_vi:"CTCP Chứng khoán Trí Việt",type:4,san:"HOSE"},{code:"VND",fullname_vi:"CTCP Chứng khoán VNDirect",type:4,san:"HOSE"},{code:"IVS",fullname_vi:"CTCP Chứng khoán Guotai Junan (Vietnam)",type:4,san:"HNX"},{code:"HBS",fullname_vi:"CTCP Chứng khoán Hòa Bình",type:4,san:"HNX"},{code:"TVS",fullname_vi:"CTCP Chứng khoán Thiên Việt",type:4,san:"HOSE"},{code:"TCI",fullname_vi:"CTCP Chứng khoán Thành Công",type:4,san:"HOSE"},{code:"HCM",fullname_vi:"CTCP Chứng khoán Thành phố Hồ Chí Minh",type:4,san:"HOSE"},{code:"FUEVFVND",fullname_vi:"Chứng chỉ Quỹ ETF DCVFMVN DIAMOND",type:5,san:"HOSE"},{code:"FUESSV50",fullname_vi:"Chứng chỉ quỹ ETF SSIAM VNX50",type:5,san:"HOSE"},{code:"E1VFVN30",fullname_vi:"Chứng chỉ Quỹ ETF DCVFMVN30",type:5,san:"HOSE"},{code:"FUEMAV30",fullname_vi:"Chứng chỉ Quỹ ETF MAFM VN30",type:5,san:"HOSE"},{code:"FUESSV30",fullname_vi:"Chứng chỉ Quỹ ETF SSIAM VN30",type:5,san:"HOSE"},{code:"FUEIP100",fullname_vi:"Chứng chỉ Quỹ ETF IPAAM VN100",type:5,san:"HOSE"},{code:"FUEVN100",fullname_vi:"Chứng chỉ Quỹ ETF VINACAPITALVN100",type:5,san:"HOSE"},{code:"FUESSVFL",fullname_vi:"Chứng chỉ Quỹ ETF SSIAM VNFIN LEAD",type:5,san:"HOSE"},{code:"FUEKIV30",fullname_vi:"Chứng chỉ Quỹ ETF KIM GROWTH VN30",type:5,san:"HOSE"},{code:"FUEDCMID",fullname_vi:"Chứng chỉ Quỹ ETF DCVFMVNMIDCAP",type:5,san:"HOSE"},{code:"FUEKIVFS",fullname_vi:"Chứng chỉ Quỹ ETF KIM GROWTH VNFINSELECT",type:5,san:"HOSE"},{code:"VN-INDEX",fullname_vi:"Chỉ số VNINDEX",type:"index",san:"HOSE"},{code:"HNXIndex",fullname_vi:"Chỉ số HNXINDEX",type:"index",san:"HNX"},{code:"HNXUpcomIndex",fullname_vi:"Chỉ số UPCOMINDEX",type:"index",san:"UPCOM"},{code:"VN30",fullname_vi:"Chỉ số VN30",type:"index",san:"HOSE"},{code:"HNX30",fullname_vi:"Chỉ số HNX30",type:"index",san:"HNX"},{code:"DJI",fullname_vi:"Chỉ số DOW",type:"index"},{code:"NasDaq",fullname_vi:"Chỉ số IXIC",type:"index",san:""},{code:"GSPC",fullname_vi:"Chỉ số S&P 500",type:"index"},{code:"AORD",fullname_vi:"Chỉ số All Ordinaries",type:"index"},{code:"BSE-India",fullname_vi:"Chỉ số INDIA",type:"index"},{code:"STI",fullname_vi:"Chỉ số STI",type:"index"},{code:"VSHIS",fullname_vi:"Chỉ số Hang Seng",type:"index"},{code:"KS11",fullname_vi:"Chỉ số KOSPI",type:"index"},{code:"FCHI",fullname_vi:"Chỉ số CAC 40",type:"index"},{code:"JCI-Indonesia",fullname_vi:"Chỉ số INDONESIA",type:"index"},{code:"N225",fullname_vi:"Chỉ số Nikkei 225",type:"index"},{code:"VSSTI",fullname_vi:"Chỉ số Singapore Straits Times",type:"index"},{code:"VSSX5E",fullname_vi:"Chỉ số EURO STOXX 50",type:"index"},{code:"FTSE",fullname_vi:"Chỉ số FTSE 100",type:"index"},{code:"GDAXI",fullname_vi:"Chỉ số DAX",type:"index"},{code:"VSND",fullname_vi:"Chỉ số Nasdaq 100 Futures",type:"index"},{code:"VSSP",fullname_vi:"Chỉ số S&P 500 Futures",type:"index"},{code:"VSZD",fullname_vi:"Chỉ số Dow Jones Futures",type:"index"},{code:"SS000001",fullname_vi:"Chỉ số Shanghai Com",type:"index"}];

    // host
    const apifialda3 = 'https://fwtapi3.fialda.com/';
    const mastradingviewURL = 'https://mastrade.masvn.com/api/v1/tradingview/history';

    // khai báo biến
    var mack = [],
        theme = 'light';
    var autoUpdate, items, urlParams = new URLSearchParams(window.location.search),
        lastSymbol = urlParams.get("q") || "VN-INDEX",
        title = document.querySelector(".title"),
        status = document.querySelector(".status"),
        input = document.getElementById("searchCK"),
        listCK = document.getElementById("listCK"),
        myChart = document.getElementById("mychartcontainers");

    // thông báo giờ giao dịch
    const statusText = () => {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        status.innerHTML = isStockMarketOpen() ? `<span title="Đang trong giờ giao dịch!"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18" fill="none"><circle fill="currentColor" cx="9" cy="9" r="4"></circle></svg></span>` : `<span title="Ngoài giờ giao dịch!"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><rect width="10" height="4" fill="currentColor" rx="2" x="4" y="7"></rect></svg></span>`;
    }

    setInterval(statusText, 1e4);

    async function getChart() {
        var lastWidth = window.innerWidth,
            lastHeight = window.innerHeight;
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            lastHeight = lastHeight - 200;
        }
        document.querySelector(".tabledumuaban").innerHTML = '';
        statusText();
        items = allKey.find(c => c.code == lastSymbol);
        if (items) {
            title.innerHTML = items.fullname_vi;
            clearInterval(autoUpdate);
            await renderChart("mychartcontainers", lastWidth, lastHeight - 40, lastSymbol, true, theme, true);
		// gửi mã cổ phiếu
    		window.parent.postMessage({
        		code: lastSymbol,
   		 }, "*");
            let fillterCode = [];
            if (lastSymbol !== "VN-INDEX") {
                fillterCode = lastSymbol
            }
            AddNews([fillterCode]); // lấy tin tức
        } else {
            createNotification("Mã chứng khoán, chứng quyền, Index không đúng!")
        }
    }
    getChart();

    // khu vực tìm kiếm, ô nhập
    let isInputShow = false;
    const n = () => {
        listCK.innerHTML = "";
        var temp = [];
        // loại bỏ trùng lặp
        mack = mack.filter((o, i, self) => {
            return i === self.findIndex((e) => e.code === o.code);
        });
        mack.forEach(t => {
            if (!isNaN(t.type)) {
                listCK.innerHTML += `<span><li class="item" id="${t.code}">${t.code} - ${t.fullname_vi}</li></span>`;
                temp.push(t);
            } else {
                listCK.innerHTML += `<span><li class="item" id="${t.code}"> ${t.fullname_vi}</li></span>`;
                temp.push(t);
            }
        })
        listCK.setAttribute("style", `display:${temp.length?'block':'none'}!important`)
    };

    listCK.addEventListener("click", function(e) {
        var codevm = e.target.id;
        var pop = false
        if (codevm) {
            let index = allKey.findIndex(t => t.code === codevm);
            if (allKey[index].type == 'cw' || allKey[index].type == 'index' || !isNaN(allKey[index].type)) {
                if (e.ctrlKey) {
                    e.preventDefault();
                    a("dulieuvimo.html?s=" + codevm, 700)
                } else {
                    lastSymbol = codevm;
                    getChart();
                    listCK.setAttribute("style", "display:none!important")
                }
            } else a("dulieuvimo.html?s=" + codevm, 700)
        }
        listCK.setAttribute("style", "display:none!important");
        exitInput();
    });

    input.addEventListener("input", async function(t) {
        let a = t.target.value;
        showInput();
        t.target.value = a.toUpperCase();
        if (2 >= this.value.length) await favour();
        else {
            if (this.value.length >= 3) {
                mack = allKey.filter(t => (t.code + " " + t.fullname_vi)
                    .toLowerCase()
                    .includes(this.value.toLowerCase())).slice(0, 100), n()
            } else {
                listCK.setAttribute("style", "display:none!important")
            }
        }
    });

    function saveStockList(stockList) {
        localStorage.setItem('stockList', JSON.stringify(stockList));
    }

    function getStockList() {
        const stockList = localStorage.getItem('stockList');
        return stockList ? JSON.parse(stockList) : [];
    }

    // Thêm mã cổ phiếu vào danh sách
    function addStockToList(stockCode) {
        const stockList = getStockList();
        if (!stockList.includes(stockCode)) {
            stockList.push(stockCode);
            saveStockList(stockList);
            console.log(`Đã thêm mã cổ phiếu: ${stockCode}`);
        } else {
            console.log(`Mã cổ phiếu ${stockCode} đã có trong danh sách.`);
        }
    }

    // Xóa mã cổ phiếu khỏi danh sách
    function removeStockFromList(stockCode) {
        const stockList = getStockList();
        const updatedList = stockList.filter(code => code !== stockCode);
        saveStockList(updatedList);
        console.log(`Đã xóa mã cổ phiếu: ${stockCode}`);
    }

    const favour = () => {
        let list = getStockList();
        mack = [];
        list.forEach(stock => {
            let index = allKey.find(c => c.code == stock);
            if (index) mack.push(index);
        })
        if (mack.length) n()
    }

    document.querySelector("#theodoi")
        .addEventListener("click", function(e) {
            if (isInputShow) exitInput();
            else showInput();
        });
    document.addEventListener("click", function(e) {
        if (e.target.classList.contains("suggestions") && !input.contains(e.target)) exitInput();
    });
    input.addEventListener("keyup", function(e) {
        if (mack.length && 13 === e.keyCode) {
            e.preventDefault();
            lastSymbol = mack[0].code
            getChart();
            listCK.setAttribute("style", "display:none!important");
            exitInput();
        }
    })
    document.body.addEventListener("keydown", (event) => {
        const isAlphaNumeric = event.key.match(/^[a-zA-Z0-9]$/);
        if (isAlphaNumeric && !isInputShow) {
            showInput();
            input.focus();
        }
    });

    function showInput() {
        document.querySelector(".suggestions").classList.add('popup');
        input.style.left = null;
        input.style.marginTop = (window.innerHeight - 250) / 2 + "px";
        input.style.position = "relative";
        isInputShow = true;
        favour();
    }

    function exitInput() {
        document.querySelector(".suggestions").classList.remove('popup');
        input.style.left = "-500px";
        input.value = "";
        input.style.position = "absolute";
        listCK.setAttribute("style", "display:none!important");
        isInputShow = false;
    }

    // khi nhấn esc
    document.addEventListener("keyup", function(e) {
        27 === e.keyCode && (e.preventDefault(), listCK.setAttribute("style", "display:none!important"), exitInput())
    })

    function loading(i = !0) {
        document.getElementById("load")
            .innerHTML = i ? `<div class="loading-container"><div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>` : "";
    }


    // tạo biểu đồ lightweight
    async function renderChart(container, rong, dai, symbolName, isMaxWidth = false, theme = 'light', re = false) {
        const ThemeOptions = {
            "dark": {
                layout: {
                    backgroundColor: 'rgb(24, 28, 39)',
                    textColor: 'rgb(178, 181, 190)',
                },
                timeScale: {
                    rightOffset: 20,
                    borderColor: "rgba(240, 243, 250, 0.06)"
                },
                rightPriceScale: {
                    borderColor: "rgba(240, 243, 250, 0.06)",
                    autoScale: true,
                    scaleMargins: {
                        top: 0.1,
                        bottom: 0.08,
                    }
                },
                grid: {
                    vertLines: {
                        color: 'rgba(240, 243, 250, 0.06)',
                    },
                    horzLines: {
                        color: 'rgba(240, 243, 250, 0.06)',
                    },
                },
            },
            "light": {
                layout: {
                    backgroundColor: 'rgb(255, 255, 255)',
                    textColor: '#000',
                },
                timeScale: {
                    rightOffset: 20,
                    borderColor: "rgb(225, 226, 227)"
                },
                rightPriceScale: {
                    borderColor: "rgb(225, 226, 227)",
                    autoScale: true,
                    scaleMargins: {
                        top: 0.1,
                        bottom: 0.08,
                    }
                },
                grid: {
                    vertLines: {
                        color: "rgba(42, 46, 57, 0.06)"
                    },
                    horzLines: {
                        color: "rgba(42, 46, 57, 0.06)"
                    }
                },
            },
        };
        var items = allKey.find(item => item['code'].toUpperCase() == symbolName.toUpperCase());
        const domElement = document.getElementById(container);
        var ohlc = [],
            volume = [],
            closep = [],
            change = [],
            changep = [],
            ma20 = [],
            ma50 = [],
            ma150 = [],
            ma200 = [],
            banker_rsi = [],
            hot_rsi = [],
            bankermcdx = [],
            hotmcdx = [];
        loading(!0);
        domElement.innerHTML = "";
        await getData();

        // khởi tạo biểu đồ
        const chart = LightweightCharts.createChart(domElement, {
            width: rong,
            height: dai,
            crosshair: {
                mode: LightweightCharts.CrosshairMode.Normal,
            },
            overlayPriceScales: {
                scaleMargins: {
                    top: 0.7,
                    bottom: 0,
                }
            },
            pane: 0,
        });
        chart.applyOptions(ThemeOptions[theme]);

        // thêm biểu đồ nến
        const candleSeries = chart.addCandlestickSeries({
            title: symbolName,
            upColor: "#179f89",
            downColor: "#f55c68",
            borderDownColor: "#f55c68",
            borderUpColor: "#179f89",
            wickDownColor: "#f55c68",
            wickUpColor: "#179f89",
            pane: 0
        })
        // thêm biểu đồ miền
        const areaSeries = chart.addAreaSeries({
            title: symbolName,
            topColor: 'rgba(70, 130, 180, 0.5)',
            bottomColor: 'rgba(70, 130, 180, 0.1)',
            lineColor: '#4682B4',
            lineWidth: 2,
            visible: !1
        });
        // thêm khối lượng
        const volumeSeries = chart.addHistogramSeries({
            priceFormat: {
                type: 'volume',
            },
            priceScaleId: '',
            priceLineVisible: false,
            priceScale: {
                scaleMargins: {
                    top: 0.7,
                    bottom: 0
                },
            },
            pane: 0
        });
        // SMA20 volume
        const smavolumeseries = chart.addAreaSeries({
            topColor: 'rgba(56, 33, 110,0.6)',
            bottomColor: 'rgba(56, 33, 110, 0.1)',
            lineWidth: 1,
            priceFormat: {
                type: 'volume'
            },
            lineStyle: 0,
            axisLabelVisible: true,
            crosshairMarkerVisible: false,
            priceScaleId: '',
            lastValueVisible: true,
            priceLineVisible: false,
            pane: 0
        });
        // ma20
        const ma20series = chart.addLineSeries({
            color: '#3289F5',
            lineWidth: 1,
            lineStyle: 0,
            axisLabelVisible: false,
            //title: 'MA20',
            lastValueVisible: false,
            priceLineVisible: false,
            crosshairMarkerVisible: true,
            pane: 0
        });
        // thêm MA50
        const ma50series = chart.addLineSeries({
            color: '#f68c2f',
            lineWidth: 1,
            lineStyle: 0,
            axisLabelVisible: true,
            lastValueVisible: false,
            priceLineVisible: false,
            crosshairMarkerVisible: true,
            pane: 0
        });
        // thêm MA150
        const ma150series = chart.addLineSeries({
            color: 'rgb(33, 150, 243)',
            lineWidth: 1.5,
            lineStyle: 1,
            visible: !1,
            axisLabelVisible: true,
            lastValueVisible: false,
            priceLineVisible: false,
            crosshairMarkerVisible: true,
            pane: 0
        });
        // thêm MA200
        const ma200series = chart.addLineSeries({
            color: 'rgb(33, 150, 243)',
            lineWidth: 1.5,
            lineStyle: 0,
            visible: !0,
            axisLabelVisible: true,
            lastValueVisible: false,
            priceLineVisible: false,
            crosshairMarkerVisible: true,
            pane: 0
        });
        // thêm zigzag
        const zigzagSeries = chart.addLineSeries({
            color: 'orange',
            lineWidth: 2,
        });

        candleSeries.setData(ohlc);
        areaSeries.setData(closep);
        volumeSeries.setData(volume);
        smavolumeseries.setData(calculateSMA(volume, 20))
        ma20series.setData(ma20)
        ma50series.setData(ma50)
        ma150series.setData(ma150)
        ma200series.setData(ma200)

        // indicator phụ
        var current_indicator;
        await addIndicator();
        var oldw, oldh;
        // thay đổi kích thước khi kích thước màn hình thay đổi
        window.addEventListener("click", resizeW);

        function resizeW() {
            let w = window.innerWidth,
                h = window.innerHeight;
            if (document.fullscreenElement) {
                chart.resize(w, h);
            } else if (isMaxWidth) {
                if (/Mobi|Android/i.test(navigator.userAgent)) {
                    h = h - 200;
                }
                chart.resize(w, h - 40);
            }

        }
        window.addEventListener("resize", () => {
            let w = window.innerWidth,
                h = window.innerHeight;
            if (document.fullscreenElement) {
                chart.resize(w, h);
            } else if (isMaxWidth) {
                chart.resize(w, h - 40);
            }
        });

        // thay đổi kích thước khi chuyển fullscreen
        document.addEventListener("fullscreenchange", () => {
            let w = window.innerWidth,
                h = window.innerHeight;
            if (!document.fullscreenElement) {
                chart.resize(rong, dai);
                domElement.querySelector(".input_code")
                    .setAttribute("style", "display:none;");
            } else {
                domElement.querySelector("#fullscreen")
                    .title = "Thoát chế độ toàn màn hình!";
                domElement.querySelector(".input_code")
                    .setAttribute("style", "font-size:18px; font-weight:600;position:absolute;color:var(--black); top:10px; left: 10px; width: 500px;z-index:10;");
                chart.resize(w, h);
            }
        });
        var showDumua = true;
        var isCandleStick = true,
            ispop = true,
            isMA20 = true,
            isMA50 = true,
            isMA150 = false,
            isMA200 = true,
            isZigzag = true;
        autoUpdate = isStockMarketOpen() && setInterval(autoRefresh, 10000);
	addZigzag();
        // Thêm chú giải
        const legend = document.createElement('div');
        legend.style = `position: absolute; top: 40px; z-index: 100; font-size: 13px; font-family: Inter, "Nunito Sans", Lexend, "Noto Sans", sans-serif; line-height: 18px; font-weight: bold; width:100%;background-color:transparent;display: flex;justify-content: space-between;width: 100%; margin:auto;`;
        const tickicon2 = `<svg data-icon="tick" width="16" height="16" viewBox="0 0 16 16" style="fill: #a79393;"><desc>tick</desc><path d="M14 3c-.28 0-.53.11-.71.29L6 10.59l-3.29-3.3a1.003 1.003 0 00-1.42 1.42l4 4c.18.18.43.29.71.29s.53-.11.71-.29l8-8A1.003 1.003 0 0014 3z" fill-rule="evenodd"></path></svg>`
        const indi = document.createElement('div');
        indi.style = `font-size: 11px; font-family: Inter, "Nunito Sans", Lexend, "Noto Sans", sans-serif; line-height: 18px; font-weight: bold;float:right; background-color:transparent;margin-right:60px;display: flex;align-items: flex-start;`;
        indi.innerHTML = `<style>#Indicator a:hover {background-color: #ebf1f5;cursor:pointer;}#Indicator a{color:#106ba3}</style><button type="button" id="changeTypeChart" title="Thay đổi kiểu biểu đồ" class="bp3-button bp3-small" style="margin-right: 4px;border-radius: 4px;box-sizing: border-box;"><img  src="./library/icons/${isCandleStick?'area':'candle'}.png" style="width:16px;height:16px;pointer-events: none;"/></button><button type="button" title="Lựa chọn biểu đồ kỹ thuật"  style="margin-right: 4px;border-radius: 4px;box-sizing: border-box;" class="bp3-button bp3-small" id="fxindicator"><img  src="./library/icons/fx.png" style="width:16px;height:16px;pointer-events: none;"/></button><!---<button type="button" id="fullscreen" title="Xem toàn màn hình." style="margin-right: 4px;border-radius: 4px;box-sizing: border-box;" class="bp3-button bp3-small"><img src="./library/icons/fullscreen.png" style="width:16px;height:16px;pointer-events: none;"/></button>--->`;
        const firstRow = document.createElement('div');
        firstRow.style = `color:var(--black);margin-left:10px;`;
        legend.appendChild(firstRow);
        legend.appendChild(indi);
        domElement.appendChild(legend);
        var tencophieu = document.createElement("div");
        tencophieu.setAttribute("class", "input_code");
        tencophieu.setAttribute("style", "display:none;color:var(--black)");
        tencophieu.innerHTML = items.fullname_vi + ` (${symbolName})`;
        domElement.appendChild(tencophieu);
        const dumua = document.createElement('div');
        dumua.setAttribute("class", "dumuaban");
        dumua.style = `position: absolute; top: 40px; left:10px; z-index: 1000; font-size: 11px; line-height: 18px; margin:auto;`;
        legend.appendChild(dumua);
        // check yeuthich
        const stockList = getStockList();
        let yeuthich = stockList.includes(symbolName)
	function addZigzag(){
		if (isZigzag){
                    var drawdowns = findRecoveries(closep);
                    function convertDate(dateStr) {
                        const [day, month, year] = dateStr.split('/');
                        return `20${year.length === 2 ? year : year.slice(-2)}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                    }

                    // Tạo các điểm đỉnh, đáy, hồi phục
                    const zigzagPoints = [];
                    drawdowns.forEach(dd => {
                        zigzagPoints.push({
                            time: convertDate(dd.startDate),
                            value: dd.start
                        }); // Đỉnh
                        zigzagPoints.push({
                            time: convertDate(dd.bottomDate),
                            value: dd.bottom
                        }); // Đáy
                        zigzagPoints.push({
                            time: convertDate(dd.recoveryDate),
                            value: dd.recoveryPrice
                        }); // Hồi phục
                    });
		// Sắp xếp theo thời gian để đảm bảo nối đúng
		zigzagPoints.sort((a, b) => new Date(a.time) - new Date(b.time));
		// loại bỏ đối tượng trùng thời gian
		const seenTimes = new Set();
		const cleanedPoints = zigzagPoints.filter(p => {
    			if (seenTimes.has(p.time)) return false;
    			seenTimes.add(p.time);
    			return true;
		});
		zigzagSeries.setData(cleanedPoints);
                   // zigzagSeries.setData(zigzagPoints);

                    // Thêm marker cho đỉnh, đáy, hồi phục
                    const markers = [];

                    drawdowns.forEach(dd => {
                        markers.push({
                            time: convertDate(dd.startDate),
                            position: 'aboveBar',
                            color: 'red',
                            shape: 'arrowDown', // hoặc 'circle', 'square', 'arrowUp'
                            text: 'Đỉnh'
                        });

                        markers.push({
                            time: convertDate(dd.bottomDate),
                            position: 'belowBar',
                            color: 'green',
                            shape: 'arrowUp',
                            text: 'Đáy'
                        });

                        markers.push({
                            time: convertDate(dd.recoveryDate),
                            position: 'aboveBar',
                            color: 'blue',
                            shape: 'circle',
                            text: 'Hồi phục'
                        });
                    });
			markers.sort((a, b) => new Date(a.time) - new Date(b.time));
                    zigzagSeries.setMarkers(markers);
		}else {
                	zigzagSeries.setMarkers([]);
                	zigzagSeries.setData([]);

		}
	}
        async function addIndicator() {
            try {
                chart.removePane(1);
            } catch (e) {}


            current_indicator = localStorage.getItem("indicator");
            showDumua = localStorage.getItem("dumuaban");
            switch (current_indicator) {
                case "rs":
                    if (symbolName == "VN-INDEX") break;
                    var RS = await calculateRS(ohlc);
                    var RSsignal = await calculateEMA(RS, 20);
                    const RSline = chart.addLineSeries({
                        title: 'RS Line',
                        color: '#f68c2f',
                        lineWidth: 2,
                        lineStyle: 0,
                        axisLabelVisible: true,
                        lastValueVisible: 0,
                        priceLineVisible: false,
                        crosshairMarkerVisible: true,
                        pane: 1
                    });
                    const RSsma20 = chart.addLineSeries({
                        title: 'RS Signal',
                        color: '#3289F5',
                        lineWidth: 1,
                        lineStyle: 0,
                        axisLabelVisible: true,
                        lastValueVisible: 0,
                        priceLineVisible: false,
                        crosshairMarkerVisible: true,
                        pane: 1
                    });
                    RSsma20.setData(RSsignal);
                    RSline.setData(RS);
                    break;
                case "mcdx":
                    // thêm MCDX - hot
                    const mcdx_hot = chart.addHistogramSeries({
                        title: 'Hot Money',
                        priceFormat: {
                            minMove: 1,
                            precision: 2,
                        },
                        color: '#FFFF00',
                        pane: 1,
                        priceScale: {
                            min: 0,
                            max: 20
                        }
                    })
                    const mcdx_banker = chart.addHistogramSeries({
                        title: 'Banker',
                        priceFormat: {
                            minMove: 1,
                            precision: 2,
                        },
                        autoScale: true,
                        priceScale: {
                            min: 0,
                            max: 20
                        },
                        color: '#FF0000',
                        pane: 1,
                    })
                    banker_rsi.forEach(r => {
                        let a = 1.5 * (r.value - 50);
                        let b = a > 20 ? 20 : a < 0 ? 0 : a
                        bankermcdx.push({
                            time: r.time,
                            value: b,
                            color: b > 5 ? '#FF0000' : 'pink'
                        })
                    });
                    mcdx_banker.setData(bankermcdx);
                    hot_rsi.forEach(r => {
                        let a = .7 * (r.value - 30);
                        let b = a > 20 ? 20 : a < 0 ? 0 : a;
                        hotmcdx.push({
                            time: r.time,
                            value: b
                        })
                    });
                    mcdx_hot.setData(hotmcdx);
                    break;
                default:
            }
        }

        domElement.addEventListener('click', (e) => {
            try {
                const oldp = document.getElementById('Indicator');
                !indi.contains(e.target) && oldp && (indi.removeChild(oldp), ispop = true);
            } catch (e) {
                ispop = true;
            }
        });
        indi.addEventListener('click', async (e) => {
            var idtarget = e.target.id
            try {
                const oldp = document.getElementById('Indicator');
                indi.removeChild(oldp);
                ispop = false;
            } catch (e) {
                ispop = true;
            }
            if (idtarget) {
                switch (idtarget) {
                    case "fullscreen":
                        document.fullscreenElement ? document.exitFullscreen() : domElement.requestFullscreen();
                        break;
                    case "zigzag-indicator":
			isZigzag = !isZigzag
                        addZigzag();
                        break;
                    case "rs-indicator":
                        current_indicator = "rs" === current_indicator ? "all" : "rs";
                        localStorage.setItem('indicator', current_indicator);
                        addIndicator();
                        break;
                    case "mcdx-indicator":
                        current_indicator = "mcdx" == current_indicator ? "all" : "mcdx";
                        localStorage.setItem('indicator', current_indicator);
                        addIndicator();
                        break;
                    case "bs-indicator":
                        showDiscount(symbolName, closep);
                        break;
                    case "ma20-indicator":
                        isMA20 = !isMA20
                        ma20series.applyOptions({
                            visible: isMA20
                        });
                        break;
                    case "ma50-indicator":
                        isMA50 = !isMA50
                        ma50series.applyOptions({
                            visible: isMA50
                        });
                        break;
                    case "ma150-indicator":
                        isMA150 = !isMA150
                        ma150series.applyOptions({
                            visible: isMA150
                        });
                        break;
                    case "ma200-indicator":
                        isMA200 = !isMA200
                        ma200series.applyOptions({
                            visible: isMA200
                        });
                        break;
                    case "show-dumua":
                        showDumua = !showDumua;
                        localStorage.setItem('dumuaban', showDumua);
                        !showDumua && (domElement.querySelector(".dumuaban").innerHTML = "");
                        DuMuaBan();
                        break;
                    case "show-goiy":
                        yeuthich = !yeuthich;
                        if (yeuthich) addStockToList(symbolName);
                        else removeStockFromList(symbolName);
                        break;
                    case "changeTypeChart":
                        isCandleStick = !isCandleStick
                        areaSeries.applyOptions({
                            visible: !isCandleStick
                        });
                        candleSeries.applyOptions({
                            visible: isCandleStick
                        });
                        document.getElementById('changeTypeChart').src = "./library/icons/" + (isCandleStick ? 'area' : 'candle') + ".png";
                        break;
                    default:
                        if (ispop) {
                            var selectDiv = document.createElement('div');
                            selectDiv.id = "Indicator";
                            selectDiv.style = `position:absolute; right:100px; top:30px; box-shadow: 0 0 0 1px rgba(16,22,26,.1), 0 2px 4px rgba(16,22,26,.2), 0 8px 24px rgba(16,22,26,.2);-webkit-transform: scale(1);transform: scale(1);border-radius: 3px;display: inline-block;z-index: 100;width:140px;padding:2px;background-color:#fff;color:#5c7080;z-index:10001;`;
                            var tindicator = localStorage.getItem("indicator");
                            selectDiv.innerHTML = `<a id="ma20-indicator" style="display: flex;flex-direction: row;align-items: flex-start;border-radius: 2px;color: inherit;line-height: 20px;padding: 5px 7px;text-decoration: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;justify-content: space-between;">MA20<span style="float:right">${isMA20?tickicon2:''}</span></a>
<a id="ma50-indicator" style="display: flex;flex-direction: row;align-items: flex-start;border-radius: 2px;color: inherit;line-height: 20px;padding: 5px 7px;text-decoration: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;justify-content: space-between;">MA50<span style="float:right">${isMA50?tickicon2:''}</span></a>
<!--<a id="ma150-indicator" style="display: flex;flex-direction: row;align-items: flex-start;border-radius: 2px;color: inherit;line-height: 20px;padding: 5px 7px;text-decoration: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;justify-content: space-between;">MA150<span style="float:right">${isMA150?tickicon2:''}</span></a>-->
<a id="ma200-indicator" style="display: flex;flex-direction: row;align-items: flex-start;border-radius: 2px;color: inherit;line-height: 20px;padding: 5px 7px;text-decoration: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;justify-content: space-between;">MA200<span style="float:right">${isMA200?tickicon2:''}</span></a>
<a id="zigzag-indicator" style="display: flex;flex-direction: row;align-items: flex-start;border-radius: 2px;color: inherit;line-height: 20px;padding: 5px 7px;text-decoration: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;justify-content: space-between;">Đường Zigzag<span style="float:right">${isZigzag?tickicon2:''}</span></a>
<span style="border-top: 1px solid rgba(16,22,26,.15);display: block; margin: 5px;width:90%"></span>
<a id="mcdx-indicator" style="display: flex;flex-direction: row;align-items: flex-start;border-radius: 2px;color: inherit;line-height: 20px;padding: 5px 7px;text-decoration: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;justify-content: space-between;">Dòng tiền MCDX<span style="float:right">${tindicator == "mcdx"?tickicon2:''}</span></a>
<a id="rs-indicator" style="display: flex;flex-direction: row;align-items: flex-start;border-radius: 2px;color: inherit;line-height: 20px;padding: 5px 7px;text-decoration: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;justify-content: space-between;">Relative Strength<span style="float:right">${tindicator == "rs"?tickicon2:''}</span></a>
<a id="bs-indicator" style="display: flex;flex-direction: row;align-items: flex-start;border-radius: 2px;color: inherit;line-height: 20px;padding: 5px 7px;text-decoration: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;justify-content: space-between;">Mức chiết khấu<span style="float:right"></span></a>
<span style="border-top: 1px solid rgba(16,22,26,.15);display: block; margin: 5px;width:90%"></span>
<a id="show-dumua" style="display: flex;flex-direction: row;align-items: flex-start;border-radius: 2px;color: inherit;line-height: 20px;padding: 5px 7px;text-decoration: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;justify-content: space-between;">Dư mua bán<span style="float:right">${showDumua?tickicon2:''}</span></a>
<a id="show-goiy" style="display: flex;flex-direction: row;align-items: flex-start;border-radius: 2px;color: inherit;line-height: 20px;padding: 5px 7px;text-decoration: none;-webkit-user-select: none;-ms-user-select: none;user-select: none;justify-content: space-between;">DS gợi ý<span style="float:right">${yeuthich?tickicon2:''}</span></a>
`;
                            indi.appendChild(selectDiv);
                        }
                }
            }
        });
        let latestBar = ohlc[ohlc.length - 1]
        let o = latestBar.open,
            h = latestBar.high,
            l = latestBar.low,
            c = latestBar.close,
            v = formatNumber(volume[volume.length - 1].value),
            ma1 = 0,
            ma2 = 0;
        firstRow.innerHTML = `O: <span style="color: #2962FF">${o}</span> H: <span style="color: #2942FF">${h}</span> L: <span style="color: #2862FF">${l}</span> C: <span style="color: #2961fF">${c}</span><br/>Vol: <span style="color: #2952FF">${v}</span> MA20: <span style="color: #2552FF">${ma1}</span> MA50: <span style="color: #1162FF">${ma2}</span></div>`;

        // Tạo tooltip
        const toolTipWidth = 80,
            toolTipHeight = 80,
            toolTipMargin = 20;
        const toolTip = document.createElement('div');
        const events = document.createElement('div');
        toolTip.style = `width: 96px; height: 96px; position: absolute; display: none; padding: 8px; box-sizing: border-box; font-size: 14px; text-align: left; z-index: 100; top: 12px; left: 12px; line-height:18px;pointer-events: none; border: 1px solid; border-radius: 2px;font-family: -apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;background:white;color:#131722;`;
        toolTip.style.borderColor = '#2962FF';
        events.style = `display:none;z-index:100;position:absolute;font-size: 11px; font-family: sans-serif;width:250px;line-height: 20px; padding:8px; font-weight: bold;background-color: white;color:#000; border: 1px solid #ddd;border-radius: 2px;`
        domElement.appendChild(events);
        domElement.appendChild(toolTip);
        // cập nhật tooltip khi dê chuột
        chart.subscribeCrosshairMove(param => {
            var p = 0,
                ch = 0,
                chp = 0;
            try {
                if (param.point === undefined || !param.time || param.point.x < 0 || param.point.x > domElement.clientWidth || param.point.y < 0 || param.point.y > domElement.clientHeight) {
                    toolTip.style.display = 'none';
                } else {
                    // update tooltip
                    const dateStr = convertNumberToDate(param.time * 1000);
                    toolTip.style.display = 'block';
                    const datas = param.seriesPrices.get(candleSeries);
                    const datacp = getSeriesData(change, param.time);
                    const datacc = getSeriesData(changep, param.time);
                    const datav = getSeriesData(volume, param.time);
                    const datam1 = getSeriesData(ma20, param.time);
                    const datam2 = getSeriesData(ma50, param.time);
                    l = datas.low !== undefined ? datas.low.toFixed(2) : 0;
                    h = datas.high !== undefined ? datas.high.toFixed(2) : 0;
                    o = datas.open !== undefined ? datas.open.toFixed(2) : 0;
                    c = datas.close !== undefined ? datas.close.toFixed(2) : 0;
                    v = datav.value !== undefined ? formatNumber(datav.value) : 0;
                    ma1 = datam1.value !== undefined ? datam1.value.toFixed(2) : 0;
                    ma2 = datam2.value !== undefined ? datam2.value.toFixed(2) : 0;
                    p = (Math.round(datas.close * 100) / 100)
                        .toFixed(2);
                    ch = datacp.value.toFixed(2);
                    chp = (datacc.value * 100)
                        .toFixed(2);
                    let colorChange = ch > 0 ? 'green' : 'red';
                    toolTip.innerHTML = `<div style="color: ${'#2962FF'}">${symbolName}</div><div style="font-size: 24px; margin: 4px 0px; color: ${'black'}">${p} </div><div style = "font-weight : bold;font-size:12px;margin: 4px 0px;color: ${colorChange};">(${ch}/${chp}%)</div><div style="font-size:12px;color: ${'black'}">${dateStr}</div>`;
                    firstRow.innerHTML = `O: <span style="color: #2962FF">${o}</span> H: <span style="color: #2942FF">${h}</span> L: <span style="color: #2862FF">${l}</span> C: <span style="color: #2961fF">${c}</span> <br/>Vol: <span style="color: #2952FF">${v}</span> MA20: <span style="color: #2552FF">${ma1}</span> MA50: <span style="color: #1162FF">${ma2}</span></div>`;
                    const y = param.point.y;
                    let left = param.point.x + toolTipMargin;
                    if (left > container.clientWidth - toolTipWidth) {
                        left = param.point.x - toolTipMargin - toolTipWidth;
                    }
                    let top = y + toolTipMargin;
                    if (top > container.clientHeight - toolTipHeight) {
                        top = y - toolTipHeight - toolTipMargin;
                    }
                    events.style.left = (left > 550 ? left - 250 + 80 : left) + 'px';
                    events.style.top = top + toolTipHeight + toolTipMargin + 'px';
                    toolTip.style.left = left + 'px';
                    toolTip.style.top = top + 'px';
                }
            } catch (e) {}
        });
        loading(0);
        resizeW();
        await DuMuaBan();

        const resultMessages = checkLatestGrowth(closep);
        if (resultMessages.length > 0) {
            var txt = `<ul style="text-align:left;">` + resultMessages.map(msg => `<li>${msg}</li>`).join('') + `</ul>`;
            showPopup(txt, "📊 Chú ý phiên chạy nước rút");
        }

        // các hàm hỗ trợ
        // tự động làm mới dữ liệu
        async function autoRefresh() {
            await DuMuaBan();
            await getData();
            candleSeries.update(ohlc[ohlc.length - 1]);
            areaSeries.update(closep[closep.length - 1]);
            volumeSeries.update(volume[volume.length - 1]);
            ma20series.update(ma20[ma20.length - 1]);
            ma50series.update(ma50[ma50.length - 1]);
            ma150series.update(ma150[ma150.length - 1]);
            ma200series.update(ma200[ma200.length - 1]);
        }
        // bảng mua bán
        async function DuMuaBan() {
            const getV = (t, e) => void 0 !== e ? e[t] : 0;
            const f = (s) => {
                if (s === 'ATC' || s === 'ATO') return s
                else return s == null ? "0,0" : s.toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                })
            }
            if (isNaN(items.type) && items.type !== 'cw') {
                domElement.querySelector(".dumuaban")
                    .innerHTML = "";
                return;
            }
            if (!showDumua) return;
            var dumua = await fetch("https://mastrade.masvn.com/api/v1/market/symbolLatest?symbolList=" + symbolName);
            var data = await dumua.json();
            if (!data) return;
            let totalM = 0,
                totalB = 0;
            let m = data[0];
            for (const item of m.bb) totalM += item.v;
            for (const item of m.bo) totalB += item.v;
            var cel1 = `<span>O: ${f(getV("o", m))}</span><span>H: ${f(getV("h", m))}</span><span >L: ${f(getV("l",m))}</span>`;
            var cel2 = `<span>${f(getV("p", m.bo[2]))}</span><span>${f(getV("p",m.bo[1]))}</span><span style=" ${getV("p",m.bo[0]) == m.c ? "background-color: rgba(255,42,78,.18);":""}">${f(m.ss == "ATC" ||m.ss == "ATO"? m.ss: getV("p",m.bo[0]))}</span>`;
            var cel3 = `<span>${f(getV("v", m.bo[2]))}</span><span>${f(getV("v",m.bo[1]))}</span><span style=" ${getV("p",m.bo[0]) == m.c ? "background-color: rgba(255,42,78,.18);":""}">${f(getV("v", m.bo[0]))}</span>`;
            var cel4 = `<span style=" ${getV("p", m.bb[0]) == m.c ? "background-color: rgba(255,42,78,.18);":""}">${f(getV("v",m.bb[0]))}</span><span>${f(getV("v",m.bb[1]))}</span><span>${f(getV("v",m.bb[2]))}</span>`;
            var cel5 = `<span style=" ${getV("p",m.bb[0]) == m.c ? "background-color: rgba(255,42,78,.18);":""}">${f(m.ss == "ATC"||m.ss == "ATO"?m.ss: getV("p",m.bb[0]))}</span><span>${f(getV("p", m.bb[1]))}</span><span>${f(getV("p",m.bb[2]))}</span>`;
            var cel6 = `<span >${m.s}</span><span>C: ${f(m.c)}</span><span>TC: ${f(m.frTr)}</span>`;
            var tablehtml = `<table><tbody>
		<tr><td style="text-align: left;">${cel1}</td>
		<td style="text-align: center;">${cel2}</td>
		<td style="text-align: right;">${cel3}</td></tr>
		<tr><td style="text-align: left;">${cel4}</td>
		<td style="text-align: center; ">${cel5}</td>
		<td style="text-align: right;">${cel6}</td></tr>
		<tr><td style="text-align: left;"><span style="background-color: rgba(255,42,90,.18)">${f(totalM)}</span><span style="background-color: rgba(255,42,90,.18)">${f(m.frBvo)}</span></td>
		<td style="text-align: center; "><span style="background-color: rgba(255,42,90,.18)">Tổng</span><span style="background-color: rgba(255,42,90,.18)">Nước ngoài</span></td>
		<td style="text-align: right;"><span style="background-color: rgba(255,42,90,.18)">${f(totalB)}</span><span style="background-color: rgba(255,42,90,.18)">${f(m.frSvo)}</span></td></tr>
		</tbody></table>`;

            if (/Mobi|Android/i.test(navigator.userAgent)) {
                document.querySelector(".tabledumuaban").innerHTML = showDumua ? tablehtml : '';
            } else {
                domElement.querySelector(".dumuaban").innerHTML = showDumua ? tablehtml : '';
            }
        }
        // tải dữ liệu giá
        async function getData() {
            const url = mastradingviewURL + '?symbol=' + symbolName + '&resolution=1D&from=' + parseInt(Date.parse("2015-01-01") / 1000) + '&to=' + parseInt(Date.parse(getCurrentDate()) / 1000);
            try {
                var res = await fetch(url)
                var data = await res.json();
                var lastTime = ohlc[ohlc.length - 1].time;
                if (lastTime !== void 0) data.t[data.t.length - 1] = lastTime;
            } catch (e) {
                loading(0);
            }
            var k = items.type == "index" ? 1 : 1000;
            for (var i = 0; i < data.t.length; i += 1) {
                ohlc.push({
                    "time": parseInt(data.t[i]),
                    "open": parseFloat(data.o[i]) / k,
                    "high": parseFloat(data.h[i]) / k,
                    "low": parseFloat(data.l[i]) / k,
                    "close": parseFloat(data.c[i]) / k
                });
                volume.push({
                    "time": data.t[i],
                    "value": parseFloat(data.v[i]),
                    "color": getcolor(data.c[i], data.c[i - 1])
                });
                closep.push({
                    "time": data.t[i],
                    "value": parseFloat(data.c[i]) / k
                });
                change.push({
                    "time": data.t[i],
                    "value": (parseFloat(data.c[i]) - parseFloat(data.c[i - 1])) / k
                });
                changep.push({
                    "time": data.t[i],
                    "value": parseFloat(data.c[i]) / parseFloat(data.c[i - 1]) - 1
                });
            }
            let thaydoi = change[change.length - 1].value.toFixed(2);
            let thaydoip = (changep[changep.length - 1].value * 100).toFixed(2);
            document.querySelector(".clock").innerHTML = `<span style="color:${ccolor(thaydoi)}">${thaydoi} (${thaydoip}%)</span>`;

            ma20 = calculateSMA(closep, 20);
            ma50 = calculateSMA(closep, 50);
            ma150 = calculateSMA(closep, 150);
            ma200 = calculateSMA(closep, 200);
            banker_rsi = calculateRSI(ohlc, 50);
            hot_rsi = calculateRSI(ohlc, 40);
        };

        function getSeriesData(e, n) {
            let t = e.findIndex(e => e.time === n);
            return -1 !== t ? e[t] : []
        }

        // Tính RS
        function calculateRS(data) {
            const RS = async (d) => {
                var a = mastradingviewURL + '?symbol=VN-INDEX&resolution=1D&from=' + parseInt(Date.parse("2015-01-01") / 1000) + '&to=' + parseInt(Date.parse(getCurrentDate()) / 1000);
                var b = await fetch(a)
                var c = await b.json();
                var rs = [],
                    tmp = [],
                    e = d.length - c.t.length;
                for (var i = 0; i < c.t.length; i++) {
                    tmp.push({
                        "time": parseInt(c.t[i]),
                        "close": parseFloat(c.c[i])
                    });
                    try {
                        rs.push({
                            "time": parseInt(c.t[i]),
                            "value": 1000 * d[e + i].close / parseFloat(c.c[i]) || 0.0000001
                        });
                    } catch (e) {}
                }
                console.log('Beta: ', calculateBeta(data, tmp));
                return rs;
            }
            return RS(data);
        }

        // tính hệ số Beta
        function calculateBeta(mackin, vnindexin) {
            const slope = (e, t) => {
                for (var r = e.length, a = 0, n = 0, h = 0, o = 0, l = 0; l < r; l++) a += t[l],
                    n += e[l],
                    h += t[l] * e[l], o += t[l] * t[l], e[l] * e[l];
                return (r * h - a * n) / (r * o - a * a)
            }
            let stockPrices = mackin.slice(-250)
                .map(s => s.close);
            let vnIndexPrices = vnindexin.slice(-250)
                .map(s => s.close);
            stockPrices = stockPrices.map((r, c) => {
                if (0 === c) return 0;
                const e = stockPrices[c - 1];
                return (r - e) / e * 100
            });
            vnIndexPrices = vnIndexPrices.map((r, c) => {
                if (0 === c) return 0;
                const e = vnIndexPrices[c - 1];
                return (r - e) / e * 100
            });
            return slope(stockPrices, vnIndexPrices);
        }


        //tính RSI
        function calculateRSI(data, period) {
            var gains = []; // Mảng lưu trữ các giá trị tăng trong mỗi ngày
            var losses = []; // Mảng lưu trữ các giá trị giảm trong mỗi ngày
            var avgGain = 0; // Giá trị trung bình của các giá trị tăng trong period ngày
            var avgLoss = 0; // Giá trị trung bình của các giá trị giảm trong period ngày
            var rs = 0; // Giá trị RS (Relative Strength)
            var rsi = 0; // Giá trị RSI (Relative Strength Index)
            var rsiData = []; // RSI (Relative Strength Index)
            for (var i = 0; i < data.length; i++) {
                if (i == 0) {
                    gains.push(0);
                    losses.push(0);
                } else {
                    var change = data[i].close - data[i - 1].close;
                    if (change > 0) {
                        gains.push(change);
                        losses.push(0);
                    } else {
                        losses.push(-change);
                        gains.push(0);
                    }
                }
                if (i >= period) {
                    if (i == period) {
                        var sumGain = 0;
                        var sumLoss = 0;
                        for (var j = 0; j < period; j++) {
                            sumGain += gains[j];
                            sumLoss += losses[j];
                        }
                        avgGain = sumGain / period;
                        avgLoss = sumLoss / period;
                    } else {
                        avgGain = (avgGain * (period - 1) + gains[i]) / period;
                        avgLoss = (avgLoss * (period - 1) + losses[i]) / period;
                    }
                    if (avgLoss == 0) {
                        rs = 100;
                    } else {
                        rs = avgGain / avgLoss;
                    }
                    rsi = 100 - (100 / (1 + rs));
                    rsiData.push({
                        time: data[i].time,
                        value: rsi
                    });
                }
            }
            return rsiData;
        }

        // tinh SMA
        function calculateSMA(data, count) {
            var avg = function(data) {
                var sum = 0;
                for (var i = 0; i < data.length; i++) {
                    sum += data[i].value;
                }
                return sum / data.length;
            };
            var result = [];
            for (var i = count - 1, len = data.length; i < len; i++) {
                var val = avg(data.slice(i - count + 1, i));
                result.push({
                    time: data[i].time,
                    value: val
                });
            }
            return result;
        }

        // tính EMA
        function calculateEMA(data, period) {
            const emaData = [];
            emaData.push({
                time: data[period - 1].time,
                value: data[period - 1].value
            });
            const weight = 2 / (period + 1);
            for (let i = period; i < data.length; i++) {
                emaData.push({
                    time: data[i].time,
                    value: data[i].value * weight + emaData[i - period].value * (1 - weight)
                });
            }
            return emaData;
        }

        function ccolor(s) {
            if (s < 0) return "#bb0000";
            else if (s == 0) return "#d1d240";
            else return "#05bb00";
        }

        function getcolor(t, e) {
            return t > e ? "#62c3b3" : "#f9838c"
        }
    }

    function formatNumber(e) {
        return e >= 1e6 ? (e / 1e6)
            .toFixed(1)
            .replace(/\.0$/, "") + "M" : e >= 1e3 ? (e / 1e3)
            .toFixed(1)
            .replace(/\.0$/, "") + "k" : e
    }

    function convertNumberToDate(t) {
        const e = new Date(t);
        return `${e.getDate()}/${e.getMonth()+1}/${e.getFullYear()}`
    }

    function formatDate(dateString) {
        let year = dateString.slice(0, 4);
        let month = dateString.slice(4, 6);
        let day = dateString.slice(6, 8);
        return `${day}/${month}/${year}`;
    }

    function INDEXc(c, revert = false) {
        let code = c;
        let source = ["VN-INDEX", "HNXUpcomIndex", "HNXIndex"];
        let target = ["VNINDEX", "UPCOM", "HNX"];
        if (revert) {
            for (var i = 0; i < source.length; i++) c == target[i] && (code = source[i]);
        } else {
            for (var i = 0; i < source.length; i++) c == source[i] && (code = target[i]);
        }
        return code;
    }
})();