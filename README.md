# Feature Toggles Visual Demo

![Build](https://github.com/andrej-dyck/feature-toggles-visual-demo/actions/workflows/build.yml/badge.svg)

[Feature Toggles](https://www.martinfowler.com/articles/feature-toggles.html) are a powerful tool for development teams (including business persons) to deliver functionality quickly and safely, by decoupling code deployment from feature deployment.

> Feature Toggles decouple code deployment from feature deployment; thus, enabling true Continuous Delivery.

In simple terms, a feature toggle is an on-off switch for some part of the software system, which can be turned on or off after the deployment.

![abstract-toggle.png](readme-assets/abstract-toggle.png)

This mechanism enables teams to decide when a certain feature goes live, have a kill-switch when something isn't working as intended, not having unfinished code block deployment, do calender-driven launches, do A/B testing, and much more.

Further, this decoupling of code and feature deployment alleviates pressure from developers to _finish_ a feature, making _feature freezes_ and long-running feature-branches unnecessary, enables on-demand releases, and simplifies the workflow (cf. [trunk-based development](https://trunkbaseddevelopment.com/feature-flags/)).

You can find more information about feature toggles in the subsequent sections and provided links.

## 💻 This Demo

This demo is intended as a presentation for non-developers to visualize how features toggles help development teams decouple code deployment from feature deployment.

![shop-start.png](readme-assets/shop-start.png)
![shop-release-toggles.png](readme-assets/shop-release-toggles.png)
![shop-ops-toggles.png](readme-assets/shop-ops-toggles.png)

### Run Locally

```[shell]
git clone https://github.com/andrej-dyck/feature-toggles-visual-demo.git \
 && cd feature-toggles-visual-demo \
 && yarn install \
 && yarn build \
 && yarn preview
```

Then open [http://localhost:8080/]()

## 🎓 For Developers and Inquiring Minds

_✍ in progress ..._

### Basic Idea

### Feature Toggles vs Feature Flags

### Types of Feature Toggles

### Caution!

### Good Practices

[Feature Toggles Best Practices](https://www.flagship.io/feature-toggle-best-practices/)
[Managing Feature Toggles in Teams](https://www.thoughtworks.com/insights/blog/managing-feature-toggles-teams)

### Workflow "New Feature"

### Workflow "Changes"

[Branch by Abstraction](https://trunkbaseddevelopment.com/branch-by-abstraction/)

### Checklist

## Credits

This example is based on the design [Google Pay store example](https://github.com/google-pay/react-store) and is using its product-catalog. The code was mostly written from scratch with some copy&paste.
