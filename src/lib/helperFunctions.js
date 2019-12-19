export const getInformalBabysSex = (babysSex) => {
    switch (babysSex) {
        case 'male':
            return 'boy';
        case 'female':
            return 'girl';
        default:
            return '';
    }
}