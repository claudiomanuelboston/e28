<template>
    <div>
        <p>Claudio's ZipFoods.</p>

        <show-featured :category='featuredCategory'></show-featured>
    </div>
</template>

<script>
import ShowFeatured from './ShowFeatured.vue';

export default {
    name: 'ShowHome',
    components: { ShowFeatured },
    data: function() {
        return {
            featuredCategory: 'snacks'
        };
    }
};
</script>
