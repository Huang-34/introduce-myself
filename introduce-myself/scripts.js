// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. 回到顶部按钮的控制
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // 2. 页面切换时的淡入效果
    document.body.classList.add('fade-in');
    
    // 3. 卡片点击的水波纹效果
    const cards = document.querySelectorAll('.nav-card');
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 创建水波纹元素
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            // 获取点击位置
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // 动画结束后移除
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // 4. 添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // 5. 页面加载时的进度条动画
    const progressBars = document.querySelectorAll('.progress');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
    
    // 6. 添加打字机效果的变体
    const subtitle = document.querySelector('.animate-typing');
    if (subtitle) {
        const text = subtitle.textContent;
        subtitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                subtitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // 页面可见时才开始打字效果
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(subtitle);
    }
});

// 回到顶部函数
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 添加水波纹样式
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.4);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-card {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// ===== 复制邮箱功能（最终版） =====
document.addEventListener('DOMContentLoaded', function() {
    const copyBtn = document.getElementById('copyEmailBtn');
    
    if (copyBtn) {
        copyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 改成你的邮箱
            const email = '553468495@qq.com';
            
            // 创建临时输入框（兼容性最好的方法）
            const textarea = document.createElement('textarea');
            textarea.value = email;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            
            try {
                // 执行复制
                const successful = document.execCommand('copy');
                
                if (successful) {
                    // 显示自定义提示
                    showCopyToast('📋 邮箱地址已复制');
                } else {
                    alert('复制失败，请手动复制：' + email);
                }
            } catch (err) {
                alert('复制失败，请手动复制：' + email);
            }
            
            document.body.removeChild(textarea);
        });
    }
});

// 提示框函数
function showCopyToast(message) {
    // 移除已存在的提示
    const oldToast = document.querySelector('.copy-toast');
    if (oldToast) oldToast.remove();
    
    // 创建新提示
    const toast = document.createElement('div');
    toast.className = 'copy-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // 2秒后消失
    setTimeout(() => {
        if (toast.parentNode) {
            toast.remove();
        }
    }, 2000);
}