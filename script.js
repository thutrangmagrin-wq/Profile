document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. PRELOADER
    // ==========================================================================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 600);
        });
    }

    // ==========================================================================
    // 2. MOBILE NAVIGATION MENU TOGGLE
    // ==========================================================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // 3. HEADER SCROLL & BACK TO TOP ACTIVE STATES
    // ==========================================================================
    const mainHeader = document.getElementById('mainHeader');
    const backToTop = document.getElementById('backToTop');
    
    const handleScroll = () => {
        const scrollPos = window.scrollY;
        
        if (scrollPos > 50) {
            mainHeader.classList.add('scrolled');
        } else {
            mainHeader.classList.remove('scrolled');
        }
        
        if (scrollPos > 600) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // ==========================================================================
    // 4. ACTIVE LINK SELECTION ON SCROLL
    // ==========================================================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const activateMenuLink = () => {
        let scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    window.addEventListener('scroll', activateMenuLink);
    activateMenuLink();

    // ==========================================================================
    // 5. SCROLL REVEAL (INTERSECTION OBSERVER)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => revealObserver.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('reveal-active'));
    }

    // ==========================================================================
    // 6. TECHNICAL SKILLS TABS SWITCHING
    // ==========================================================================
    const skillTabBtns = document.querySelectorAll('.skill-tab-btn');
    const skillPanels = document.querySelectorAll('.skill-panel');
    
    skillTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            skillTabBtns.forEach(b => b.classList.remove('active'));
            skillPanels.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const targetTab = btn.getAttribute('data-tab');
            const targetPanel = document.getElementById(targetTab);
            
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // ==========================================================================
    // 7. MULTILINGUAL PROJECTS DATABASE (FOR DETAILED TABS MODAL)
    // ==========================================================================
    const projectsData = {
        'project-1': {
            category: 'COMPUTER VISION / DEEP LEARNING',
            title: `
                <span class="lang-vi">Nhận dạng chó mèo bằng CNN</span>
                <span class="lang-en">Dog & Cat Recognition using CNN</span>
            `,
            overview: `
                <div class="lang-vi">
                    <div class="panel-section">
                        <h4>Mục tiêu bài toán</h4>
                        <p>Xây dựng hệ thống học sâu (Deep Learning) để nhận dạng và phân loại tự động hình ảnh chó và mèo với độ chính xác cao. Dự án nhằm giải quyết bài toán phân loại ảnh nhị phân kinh điển trong thị giác máy tính, tạo tiền đề ứng dụng cho các hệ thống phân tích hình ảnh phức tạp hơn.</p>
                    </div>
                    <div class="panel-section">
                        <h4>Phương pháp tiếp cận & Kiến trúc</h4>
                        <p>Sử dụng mạng nơ-ron tích chập (CNN) tự thiết kế kết hợp với các kiến trúc Pre-trained nổi tiếng như ResNet hoặc VGG16 (Transfer Learning). Tích hợp các kỹ thuật Data Augmentation (xoay, lật, thu phóng ảnh) để đa dạng hóa dữ liệu huấn luyện, tăng tính tổng quát của mô hình và giảm thiểu quá khớp (overfitting).</p>
                    </div>
                </div>
                <div class="lang-en">
                    <div class="panel-section">
                        <h4>Task Goal</h4>
                        <p>Build a Deep Learning system to automatically recognize and classify dog and cat images with high accuracy. The project solves a classic binary image classification problem in computer vision, serving as a foundation for more complex image analysis systems.</p>
                    </div>
                    <div class="panel-section">
                        <h4>Approach & Architecture</h4>
                        <p>Applying a custom Convolutional Neural Network (CNN) along with popular pre-trained architectures like ResNet or VGG16 (Transfer Learning). Integrating Data Augmentation techniques (rotation, flipping, zooming) to diversify training data, improve model generalization, and mitigate overfitting.</p>
                    </div>
                </div>
            `,
            training: `
                <div class="lang-vi">
                    <div class="panel-section">
                        <h4>Dữ liệu & Quá trình huấn luyện</h4>
                        <p><strong>Bộ dữ liệu:</strong> Sử dụng tập dữ liệu Kaggle Dogs vs. Cats với hơn 25.000 hình ảnh đa dạng về góc chụp, ánh sáng và bối cảnh.</p>
                        <p><strong>Huấn luyện:</strong> Triển khai bằng framework TensorFlow/Keras trên môi trường GPU. Sử dụng hàm mất mát Binary Crossentropy, trình tối ưu hóa Adam, và kỹ thuật Early Stopping để dừng huấn luyện khi mô hình đạt đỉnh hiệu suất.</p>
                    </div>
                </div>
                <div class="lang-en">
                    <div class="panel-section">
                        <h4>Data & Training</h4>
                        <p><strong>Dataset:</strong> Utilizing the Kaggle Dogs vs. Cats dataset with over 25,000 diverse images featuring various angles, lighting, and backgrounds.</p>
                        <p><strong>Training:</strong> Implemented using the TensorFlow/Keras framework on GPU environments. Employed Binary Crossentropy loss, Adam optimizer, and Early Stopping to halt training at peak performance.</p>
                    </div>
                </div>
            `,
            results: `
                <div class="panel-section">
                    <h4 class="lang-vi">Kết quả đánh giá & Demo</h4>
                    <h4 class="lang-en">Evaluation Results & Demo</h4>
                    <p class="lang-vi">Mô hình đạt độ chính xác lên tới <strong>95%</strong> trên tập kiểm thử (Test set). Hệ thống có khả năng nhận diện hình ảnh mới với tốc độ phản hồi dưới 100ms/ảnh.</p>
                    <p class="lang-en">The model achieved an accuracy of up to <strong>95%</strong> on the test set. The system can infer new images with a response time of under 100ms/image.</p>
                    
                    <div style="margin-top:20px; padding:15px; background:rgba(255,255,255,0.05); border-radius:8px;">
                        <h5 class="lang-vi" style="margin-bottom:10px;"><i class="fa-solid fa-play"></i> Trải nghiệm Demo</h5>
                        <h5 class="lang-en" style="margin-bottom:10px;"><i class="fa-solid fa-play"></i> Experience Demo</h5>
                        <p class="lang-vi" style="font-size:0.9rem; opacity:0.8;">Vì đây là dự án AI (Python), để xem demo bạn vui lòng click nút <strong>"Mã nguồn GitHub"</strong> bên dưới. Tại đó có các hình ảnh/kết quả mẫu, hoặc bạn có thể chạy Jupyter Notebook qua Google Colab đã được cấu hình sẵn.</p>
                        <p class="lang-en" style="font-size:0.9rem; opacity:0.8;">Since this is an AI (Python) project, please click the <strong>"GitHub Source"</strong> button below to view demo results/images or run the provided Jupyter Notebook via Google Colab.</p>
                    </div>
                </div>
            `,
            links: `
                <div class="drawer-links-box">
                    <a href="https://github.com/thutrangmagrin-wq/Nh-n-d-ng-ch-m-o" target="_blank" class="btn btn-primary"><i class="fa-brands fa-github"></i> 
                        <span class="lang-vi">Mã nguồn (GitHub)</span>
                        <span class="lang-en">Source (GitHub)</span>
                    </a>
                </div>
            `
        },
        'project-2': {
            category: 'WEB DEVELOPMENT / FULLSTACK',
            title: `
                <span class="lang-vi">Nền tảng Web học trực tuyến</span>
                <span class="lang-en">Online Learning Web Platform</span>
            `,
            overview: `
                <div class="lang-vi">
                    <div class="panel-section">
                        <h4>Mục tiêu bài toán</h4>
                        <p>Thiết kế và phát triển một nền tảng E-learning toàn diện, cung cấp môi trường học tập trực tuyến linh hoạt. Kết nối giảng viên và học viên thông qua hệ thống quản lý khóa học, phát video bài giảng, bài kiểm tra tương tác và theo dõi tiến độ học tập.</p>
                    </div>
                    <div class="panel-section">
                        <h4>Tính năng cốt lõi</h4>
                        <ul>
                            <li>Đăng ký/Đăng nhập và phân quyền (Admin, Giảng viên, Học viên).</li>
                            <li>Hệ thống giỏ hàng và thanh toán khóa học.</li>
                            <li>Trình phát video mượt mà, lưu vết tiến trình học tập.</li>
                            <li>Khu vực thảo luận, hỏi đáp trực tiếp theo từng bài học.</li>
                        </ul>
                    </div>
                </div>
                <div class="lang-en">
                    <div class="panel-section">
                        <h4>Task Goal</h4>
                        <p>Design and develop a comprehensive E-learning platform that provides a flexible online learning environment. Connecting instructors and students through course management, video lectures, interactive quizzes, and progress tracking.</p>
                    </div>
                    <div class="panel-section">
                        <h4>Core Features</h4>
                        <ul>
                            <li>Authentication and role-based access (Admin, Instructor, Student).</li>
                            <li>Course shopping cart and payment integration.</li>
                            <li>Smooth video player with learning progress tracking.</li>
                            <li>Discussion forums and Q&A sections per lesson.</li>
                        </ul>
                    </div>
                </div>
            `,
            training: `
                <div class="lang-vi">
                    <div class="panel-section">
                        <h4>Công nghệ sử dụng</h4>
                        <p><strong>Frontend:</strong> Xây dựng giao diện bằng React.js, Tailwind CSS/Bootstrap giúp tương thích mọi kích thước màn hình (Responsive Design).</p>
                        <p><strong>Backend:</strong> Node.js & Express xử lý API, tương tác với cơ sở dữ liệu MongoDB/MySQL để lưu trữ thông tin người dùng và khóa học.</p>
                    </div>
                </div>
                <div class="lang-en">
                    <div class="panel-section">
                        <h4>Tech Stack</h4>
                        <p><strong>Frontend:</strong> Built with React.js and Tailwind CSS/Bootstrap to ensure fully responsive UI.</p>
                        <p><strong>Backend:</strong> Node.js & Express for RESTful APIs, interacting with MongoDB/MySQL for data persistence.</p>
                    </div>
                </div>
            `,
            results: `
                <div class="panel-section">
                    <h4 class="lang-vi">Kết quả dự án & Demo</h4>
                    <h4 class="lang-en">Project Results & Demo</h4>
                    <p class="lang-vi">Hệ thống web hoạt động trơn tru với độ trễ thấp, giao diện trực quan và bảo mật tốt. Xử lý thành công luồng mua khóa học và phát video streaming.</p>
                    <p class="lang-en">The web platform operates smoothly with low latency, intuitive UI, and solid security. Successfully handled the course purchase flow and video streaming.</p>
                    
                    <div style="margin-top:20px; padding:15px; background:rgba(255,255,255,0.05); border-radius:8px;">
                        <h5 class="lang-vi" style="margin-bottom:10px;"><i class="fa-solid fa-play"></i> Trải nghiệm Demo</h5>
                        <h5 class="lang-en" style="margin-bottom:10px;"><i class="fa-solid fa-play"></i> Experience Demo</h5>
                        <p class="lang-vi" style="font-size:0.9rem; opacity:0.8;">Bạn có thể trải nghiệm trang web trực tiếp thông qua liên kết Demo (nếu có) hoặc xem chi tiết ảnh/video chụp lại các chức năng tại trang GitHub của tôi.</p>
                        <p class="lang-en" style="font-size:0.9rem; opacity:0.8;">You can experience the website directly via the Live Demo link (if available) or view detailed screenshots/videos of the functionalities on my GitHub page.</p>
                    </div>
                </div>
            `,
            links: `
                <div class="drawer-links-box">
                    <a href="https://github.com/thutrangmagrin-wq/web-h-c-tr-c-tuy-n" target="_blank" class="btn btn-primary"><i class="fa-brands fa-github"></i> 
                        <span class="lang-vi">Mã nguồn (GitHub)</span>
                        <span class="lang-en">Source (GitHub)</span>
                    </a>
                    <a href="https://thutrangmagrin-wq.github.io/web-h-c-tr-c-tuy-n/" target="_blank" class="btn btn-secondary"><i class="fa-solid fa-square-rss"></i> 
                        <span class="lang-vi">Xem Live Demo (GitHub Pages)</span>
                        <span class="lang-en">Live Demo (GitHub Pages)</span>
                    </a>
                </div>
            `
        },
        'project-3': {
            category: 'E-COMMERCE / WEB DEVELOPMENT',
            title: `
                <span class="lang-vi">Web mã nguồn mở & Giỏ sản phẩm thời trang</span>
                <span class="lang-en">Open-source Fashion E-commerce Web</span>
            `,
            overview: `
                <div class="lang-vi">
                    <div class="panel-section">
                        <h4>Mục tiêu bài toán</h4>
                        <p>Xây dựng hệ thống thương mại điện tử chuyên nghiệp cho ngành hàng thời trang. Dự án hướng tới một trải nghiệm mua sắm mượt mà với giao diện tinh tế, sang trọng, tích hợp quản lý sản phẩm thông minh và luồng đặt hàng tự động.</p>
                    </div>
                    <div class="panel-section">
                        <h4>Tính năng cốt lõi</h4>
                        <ul>
                            <li>Hiển thị sản phẩm đa dạng, lọc theo danh mục, size, màu sắc.</li>
                            <li>Quản lý giỏ hàng (Cart) lưu trữ LocalStorage/Database.</li>
                            <li>Trang thanh toán (Checkout) thân thiện với người dùng.</li>
                            <li>Bảng điều khiển (Dashboard) cho admin quản lý kho hàng.</li>
                        </ul>
                    </div>
                </div>
                <div class="lang-en">
                    <div class="panel-section">
                        <h4>Task Goal</h4>
                        <p>Build a professional e-commerce system tailored for the fashion industry. The project aims for a seamless shopping experience with an elegant UI, smart product management, and automated checkout flows.</p>
                    </div>
                    <div class="panel-section">
                        <h4>Core Features</h4>
                        <ul>
                            <li>Dynamic product display with category, size, and color filters.</li>
                            <li>Shopping cart management with LocalStorage/Database persistence.</li>
                            <li>User-friendly checkout page.</li>
                            <li>Admin dashboard for inventory management.</li>
                        </ul>
                    </div>
                </div>
            `,
            training: `
                <div class="lang-vi">
                    <div class="panel-section">
                        <h4>Cấu trúc & Công nghệ</h4>
                        <p>Sử dụng HTML5, CSS3, JavaScript cho Frontend. Quản lý trạng thái giao diện và tương tác API RESTful để tính toán tổng tiền, áp dụng mã giảm giá và xử lý đơn đặt hàng một cách chính xác.</p>
                    </div>
                </div>
                <div class="lang-en">
                    <div class="panel-section">
                        <h4>Structure & Technologies</h4>
                        <p>Utilized HTML5, CSS3, JavaScript for Frontend. State management and RESTful API interactions handle precise order totals, discount codes, and order processing.</p>
                    </div>
                </div>
            `,
            results: `
                <div class="panel-section">
                    <h4 class="lang-vi">Kết quả dự án & Demo</h4>
                    <h4 class="lang-en">Project Results & Demo</h4>
                    <p class="lang-vi">Giao diện hiện đại mang đậm tính thời trang, logic giỏ hàng hoạt động hoàn hảo 100% không xảy ra lỗi đồng bộ. Mã nguồn được cấu trúc module hóa dễ dàng mở rộng và bảo trì.</p>
                    <p class="lang-en">Modern, fashion-centric UI with 100% accurate cart logic without sync errors. The source code is highly modular, facilitating easy expansion and maintenance.</p>
                    
                    <div style="margin-top:20px; padding:15px; background:rgba(255,255,255,0.05); border-radius:8px;">
                        <h5 class="lang-vi" style="margin-bottom:10px;"><i class="fa-solid fa-play"></i> Trải nghiệm Live Demo</h5>
                        <h5 class="lang-en" style="margin-bottom:10px;"><i class="fa-solid fa-play"></i> Experience Live Demo</h5>
                        <p class="lang-vi" style="font-size:0.9rem; opacity:0.8;">Bản dựng HTML/CSS/JS được triển khai trực tiếp. Vui lòng bấm vào nút xem Live Demo bên dưới để tự mình trải nghiệm trang mua sắm thời trang!</p>
                        <p class="lang-en" style="font-size:0.9rem; opacity:0.8;">The HTML/CSS/JS build is deployed directly. Please click the Live Demo button below to experience the fashion shopping site yourself!</p>
                    </div>
                </div>
            `,
            links: `
                <div class="drawer-links-box">
                    <a href="https://github.com/thutrangmagrin-wq/Web-m-Ngu-n-m-v-g-i-s-n-ph-m-th-i-trang" target="_blank" class="btn btn-primary"><i class="fa-brands fa-github"></i> 
                        <span class="lang-vi">Mã nguồn (GitHub)</span>
                        <span class="lang-en">Source (GitHub)</span>
                    </a>
                    <a href="https://thutrangmagrin-wq.github.io/Web-m-Ngu-n-m-v-g-i-s-n-ph-m-th-i-trang/" target="_blank" class="btn btn-secondary"><i class="fa-solid fa-square-rss"></i> 
                        <span class="lang-vi">Xem Live Demo</span>
                        <span class="lang-en">Live Demo</span>
                    </a>
                </div>
            `
        },
        'project-4': {
            category: 'MOBILE APP / REACT NATIVE',
            title: `
                <span class="lang-vi">Ứng dụng di động kinh doanh thời trang Daisy Drap</span>
                <span class="lang-en">Daisy Drap Fashion Business Mobile App</span>
            `,
            overview: `
                <div class="lang-vi">
                    <div class="panel-section">
                        <h4>Mục tiêu bài toán</h4>
                        <p>Xây dựng ứng dụng mua sắm trên nền tảng di động (iOS & Android) cho thương hiệu thời trang Daisy Drap. Mục tiêu là cung cấp trải nghiệm UX/UI mượt mà, tiện lợi hơn trên màn hình nhỏ, tối ưu tỷ lệ chuyển đổi khách hàng.</p>
                    </div>
                    <div class="panel-section">
                        <h4>Tính năng nổi bật</h4>
                        <ul>
                            <li>Giao diện Swipe, Carousel sản phẩm thân thiện với ngón tay người dùng.</li>
                            <li>Lưu trữ lịch sử mua sắm và hiển thị chương trình khuyến mãi.</li>
                            <li>Tích hợp tìm kiếm sản phẩm nhanh chóng.</li>
                            <li>Quản lý đơn đặt hàng chuyên nghiệp.</li>
                        </ul>
                    </div>
                </div>
                <div class="lang-en">
                    <div class="panel-section">
                        <h4>Task Goal</h4>
                        <p>Build a mobile shopping application (iOS & Android) for the Daisy Drap fashion brand. The goal is to provide a smooth and convenient UX/UI for small screens, optimizing customer conversion rates.</p>
                    </div>
                    <div class="panel-section">
                        <h4>Highlight Features</h4>
                        <ul>
                            <li>Finger-friendly swipe gestures and product carousels.</li>
                            <li>Shopping history tracking and promotion displays.</li>
                            <li>Fast and responsive product search integration.</li>
                            <li>Professional order management workflow.</li>
                        </ul>
                    </div>
                </div>
            `,
            training: `
                <div class="lang-vi">
                    <div class="panel-section">
                        <h4>Công nghệ & Nền tảng</h4>
                        <p><strong>Framework:</strong> Sử dụng React Native (Expo) để biên dịch chéo ra cả 2 nền tảng iOS và Android từ một nguồn code duy nhất.</p>
                        <p><strong>Quản lý State:</strong> Quản lý luồng giỏ hàng (Cart) và thông tin người dùng mượt mà, kết nối dữ liệu trực tiếp thông qua RESTful APIs.</p>
                    </div>
                </div>
                <div class="lang-en">
                    <div class="panel-section">
                        <h4>Technologies & Platforms</h4>
                        <p><strong>Framework:</strong> Utilizing React Native (Expo) to cross-compile for both iOS and Android platforms from a single codebase.</p>
                        <p><strong>State Management:</strong> Smoothly managing Cart flow and user profiles, connecting data seamlessly via RESTful APIs.</p>
                    </div>
                </div>
            `,
            results: `
                <div class="panel-section">
                    <h4 class="lang-vi">Kết quả dự án & Demo</h4>
                    <h4 class="lang-en">Project Results & Demo</h4>
                    <p class="lang-vi">Ứng dụng phản hồi cực nhanh, đạt hiệu suất gần tương đương native app. Thiết kế giao diện sang trọng, thanh lịch đúng tinh thần thương hiệu thời trang Daisy Drap.</p>
                    <p class="lang-en">Extremely fast-responsive app with near-native performance. Elegant and sophisticated UI design aligned with the Daisy Drap brand identity.</p>
                    
                    <div style="margin-top:20px; padding:15px; background:rgba(255,255,255,0.05); border-radius:8px;">
                        <h5 class="lang-vi" style="margin-bottom:10px;"><i class="fa-solid fa-mobile-screen"></i> Hướng dẫn chạy Demo</h5>
                        <h5 class="lang-en" style="margin-bottom:10px;"><i class="fa-solid fa-mobile-screen"></i> How to run Demo</h5>
                        <p class="lang-vi" style="font-size:0.9rem; opacity:0.8;">Vì đây là Ứng dụng Di động, để xem demo bạn vui lòng nhấp vào <strong>"Mã nguồn (GitHub)"</strong>. Tại đó mình có đính kèm các ảnh chụp màn hình/video trải nghiệm app, hoặc bạn có thể quét mã QR qua ứng dụng Expo Go trên điện thoại để trải nghiệm trực tiếp mã nguồn mở!</p>
                        <p class="lang-en" style="font-size:0.9rem; opacity:0.8;">Since this is a Mobile App, please click <strong>"Source (GitHub)"</strong> to view demo screenshots/videos. You can also scan the provided QR code using the Expo Go app on your phone to experience the open-source codebase directly!</p>
                    </div>
                </div>
            `,
            links: `
                <div class="drawer-links-box">
                    <a href="https://github.com/thutrangmagrin-wq/X-y-d-ng-ng-d-ng-di-ng-kinh-doanh-th-i-trang-n-Daisy-Drap" target="_blank" class="btn btn-primary"><i class="fa-brands fa-github"></i> 
                        <span class="lang-vi">Mã nguồn & Hướng dẫn Demo</span>
                        <span class="lang-en">Source & Demo Guide</span>
                    </a>
                </div>
            `
        }
    };

    // ==========================================================================
    // 8. DRAWER / SLIDE-OVER FUNCTIONALITY
    // ==========================================================================
    const projectDrawer = document.getElementById('projectDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerClose = document.getElementById('drawerClose');
    const drawerBodyContainer = document.getElementById('drawerBodyContainer');
    
    const openDrawer = (projectId) => {
        const data = projectsData[projectId];
        if (!data) return;
        
        // Inject HTML template inside drawer body container
        drawerBodyContainer.innerHTML = `
            <div class="drawer-header">
                <span class="drawer-category">${data.category}</span>
                <h3 class="drawer-title">${data.title}</h3>
                
                <div class="drawer-nav-tabs">
                    <button class="drawer-tab-btn active" data-dtab="d-overview">
                        <span class="lang-vi">Tổng quan</span>
                        <span class="lang-en">Overview</span>
                    </button>
                    <button class="drawer-tab-btn" data-dtab="d-training">
                        <span class="lang-vi">Dữ liệu & Huấn luyện</span>
                        <span class="lang-en">Data & Training</span>
                    </button>
                    <button class="drawer-tab-btn" data-dtab="d-results">
                        <span class="lang-vi">Kết quả & Đánh giá</span>
                        <span class="lang-en">Results & Evaluation</span>
                    </button>
                    <button class="drawer-tab-btn" data-dtab="d-links">
                        <span class="lang-vi">Mã nguồn & Demo</span>
                        <span class="lang-en">Source & Demo</span>
                    </button>
                </div>
            </div>
            
            <div class="drawer-panels-container">
                <div class="drawer-panel active" id="d-overview">
                    ${data.overview}
                </div>
                <div class="drawer-panel" id="d-training">
                    ${data.training}
                </div>
                <div class="drawer-panel" id="d-results">
                    ${data.results}
                </div>
                <div class="drawer-panel" id="d-links">
                    ${data.links}
                </div>
            </div>
        `;
        
        // Open drawer elements
        projectDrawer.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Initialize inside drawer tab switching
        const dTabBtns = drawerBodyContainer.querySelectorAll('.drawer-tab-btn');
        const dPanels = drawerBodyContainer.querySelectorAll('.drawer-panel');
        
        dTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                dTabBtns.forEach(b => b.classList.remove('active'));
                dPanels.forEach(p => p.classList.remove('active'));
                
                btn.classList.add('active');
                const targetDTab = btn.getAttribute('data-dtab');
                const targetDPanel = drawerBodyContainer.querySelector(`#${targetDTab}`);
                
                if (targetDPanel) {
                    targetDPanel.classList.add('active');
                }
                
                if (window.MathJax && window.MathJax.typesetPromise) {
                    window.MathJax.typesetPromise([targetDPanel]).catch(err => console.log(err));
                }
            });
        });

        if (window.MathJax && window.MathJax.typesetPromise) {
            window.MathJax.typesetPromise([drawerBodyContainer]).catch(err => console.log(err));
        }
    };
    
    const closeDrawer = () => {
        projectDrawer.classList.remove('active');
        document.body.style.overflow = '';
    };
    
    const projectCards = document.querySelectorAll('.portfolio-item');
    projectCards.forEach(card => {
        const projectId = card.getAttribute('data-project');
        const detailBtn = card.querySelector('.btn-project-detail');
        const overlay = card.querySelector('.project-overlay');
        
        if (detailBtn) {
            detailBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                openDrawer(projectId);
            });
        }
        if (overlay) {
            overlay.addEventListener('click', () => {
                openDrawer(projectId);
            });
        }
    });
    
    if (drawerClose && drawerOverlay) {
        drawerClose.addEventListener('click', closeDrawer);
        drawerOverlay.addEventListener('click', closeDrawer);
    }
    
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectDrawer.classList.contains('active')) {
            closeDrawer();
        }
    });

    // ==========================================================================
    // 9. DYNAMIC LANGUAGE SWITCHING LOGIC
    // ==========================================================================
    const langSwitch = document.getElementById('langSwitch');
    
    const setLanguage = (lang) => {
        const indicators = langSwitch.querySelectorAll('.lang-indicator');
        indicators.forEach(ind => {
            if (ind.getAttribute('data-lang') === lang) {
                ind.classList.add('active');
            } else {
                ind.classList.remove('active');
            }
        });
        
        if (lang === 'en') {
            document.body.classList.add('lang-en-active');
        } else {
            document.body.classList.remove('lang-en-active');
        }
        
        localStorage.setItem('portfolio_lang', lang);
    };

    if (langSwitch) {
        const indicators = langSwitch.querySelectorAll('.lang-indicator');
        indicators.forEach(ind => {
            ind.addEventListener('click', () => {
                const selectedLang = ind.getAttribute('data-lang');
                setLanguage(selectedLang);
            });
        });
        
        // Load language preference on startup
        const savedLang = localStorage.getItem('portfolio_lang') || 'vi';
        setLanguage(savedLang);
    }

    // ==========================================================================
    // 10. FORM SUBMISSION VIA FORMPOST (FORM-SUBMIT AJAX ENDPOINT)
    // ==========================================================================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            const originalBtnHTML = submitBtn.innerHTML;
            const currentLang = localStorage.getItem('portfolio_lang') || 'vi';
            
            // Set loading state based on language
            submitBtn.disabled = true;
            if (currentLang === 'en') {
                submitBtn.innerHTML = 'Sending message... <i class="fa-solid fa-spinner fa-spin"></i>';
            } else {
                submitBtn.innerHTML = 'Đang gửi tin nhắn... <i class="fa-solid fa-spinner fa-spin"></i>';
            }
            formStatus.innerHTML = '';
            formStatus.className = 'form-status';
            
            const formData = new FormData(contactForm);
            const formAction = contactForm.getAttribute('action');
            
            fetch(formAction, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Gửi yêu cầu không thành công.');
                }
            })
            .then(data => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
                
                formStatus.classList.add('success');
                if (currentLang === 'en') {
                    formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully. I will get back to you shortly.';
                } else {
                    formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Cảm ơn bạn! Tin nhắn đã được gửi đi thành công. Mình sẽ phản hồi lại bạn sớm nhất nhé!';
                }
                contactForm.reset();
            })
            .catch(error => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHTML;
                
                formStatus.classList.add('error');
                if (currentLang === 'en') {
                    formStatus.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Sorry, an error occurred while sending. Please contact me directly via: thutrangmagrin@gmail.com.';
                } else {
                    formStatus.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> Rất tiếc, đã xảy ra lỗi trong quá trình gửi. Vui lòng liên hệ trực tiếp qua email: thutrangmagrin@gmail.com.';
                }
                console.error(error);
            });
        });
    }
});
