<script>
export default {
    name: 'list',
    props: {
        items: {
            required: true,
            type: Array
        }
    },
    render: function(createElement) {

        let parent = createElement(
            "md-layout",
            { props: { mdColumn: true, mdFlex: 60, mdFlexSmall: 100 } },
            this.items.map((value) => {
                return createElement("div", this.$scopedSlots.default(value))
            }));

        let root = createElement(
            "md-layout",
            {
                class: { "list-layout": true }, props: {
                    mdAlign: "center"
                }
            },
            [parent]);

        return root
    }
}
</script>

<style scoped>
.list-layout {}
</style>

