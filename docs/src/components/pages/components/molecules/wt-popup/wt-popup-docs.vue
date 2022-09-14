<template>
  <section>
    <h2>Popup</h2>
    <article>
      <div class="example-wrapper">
        <div class="popup-wrapper">
          <wt-popup>
            <template slot="header">
              <h2 style="text-align: center;">Popup header</h2>
            </template>
            <template slot="main">
              <p style="text-align: justify;">Lorem ipsum dolor sit amet, consectetur adipisicing
                elit. Accusamus autem consequatur consequuntur earum, eius, exercitationem, expedita
                fugiat mollitia nam nesciunt omnis placeat provident quos sed tempore ullam
                voluptate.
                Est, molestias.</p>
            </template>
            <template slot="actions">
              <wt-button color="primary">Ok</wt-button>
              <wt-button color="secondary" style="margin-left: 20px;">Not Ok</wt-button>
            </template>
          </wt-popup>
        </div>
        <pre><code class="language-html">
            &lt;wt-popup&gt;
              &lt;template slot="header"&gt;
                &lt;h2 style="text-align: center;"&gt;Popup header&lt;/h2&gt;
              &lt;/template&gt;
              &lt;template slot="main"&gt;
                &lt;p style="text-align: justify;"&gt;Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Accusamus autem consequatur consequuntur earum, eius, exercitationem, expedita
                  fugiat mollitia nam nesciunt omnis placeat provident quos sed tempore ullam
                  voluptate.
                  Est, molestias.&lt;/p&gt;
              &lt;/template&gt;
              &lt;template slot="actions"&gt;
                &lt;wt-button color="primary"&gt;Ok&lt;/wt-button&gt;
                &lt;wt-button color="secondary" style="margin-left: 20px;"&gt;Not Ok&lt;/wt-button&gt;
              &lt;/template&gt;
            &lt;/wt-popup&gt;
          </code></pre>
      </div>
    </article>
    <component-props
      :properties="properties"
    ></component-props>
    <component-events
      :events="events"
    ></component-events>
    <component-slots
      :slots="slots"
    ></component-slots>
  </section>
</template>

<script>
  import Prism from 'prismjs';

  export default {
    name: 'wt-popup-docs',
    data: () => ({
      properties: [
        {
          value: 'minWidth',
          type: 'Number, String',
          description: 'sets min-width style value to popup container',
        },
        {
          value: 'width',
          type: 'Number, String',
          description: 'sets width style value to popup container',
        },
        {
          value: 'overflow',
          type: 'Boolean',
          default: 'false',
          description: 'If true, popup has overflow: "visible"',
        },
      ],
      events: [
        {
          value: 'close',
        },
      ],
      slots: [
        {
          name: 'header',
          description: 'popup header slot',
        },
        {
          name: 'title',
          description: "title text slot inside h3 in header, if header slot wasn't passed)",
        },
        {
          name: 'main',
          description: 'popup main content slot',
        },
        {
          name: 'actions',
          description: 'popup actions slot',
        },
      ],
    }),
    mounted() {
      Prism.highlightAll();
    },
  };
</script>

<style lang="scss" scoped>
  .popup-wrapper {
    position: relative;
    width: 600px;
    height: 500px;

    .wt-popup {
      position: absolute;
      z-index: 1;
    }
  }
</style>
